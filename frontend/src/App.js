import styles from './styles/App.module.css';
import { AppContext } from "./components/AppContext"
import {useState, useEffect} from "react"
import LoginSignUp from './components/LoginSignUp'
import HomePage from './components/HomePage'
import AdminPage from './components/AdminPage'
import axios from 'axios'
import localforage from 'localforage'
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SearchPets from './components/SearchPets';



function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedInInfo, setLoggedInInfo] = useState(null)
  const [adminInfo, setAdminInfo] = useState(null)
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [allPetsArray, setAllPetsArray] = useState([])
  const [savedPetsArray, setSavedPetsArray] = useState([])
  const [myPetsArray, setMyPetsArray] = useState([])
  const [petImages, setPetImages] = useState([])
  const [allPublicUsersArray, setAllPublicUsersArray] = useState([])
  const [allAdminUsersArray, setAllAdminUsersArray] = useState([])
  const [viewedUserDetails, setViewedUserDetails] = useState(null)
  const [petDetailsToEdit, setPetDetailsToEdit] = useState(null)
  const [searchBeforeLogin, setSearchBeforeLogin] = useState(false)

  const [sidebar, setSidebar] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  function importAllImages(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
  }

  useEffect(()=>{
    const images = importAllImages(require.context('./images', false, /\.(png|jpe?g|svg)$/));
    setPetImages(images)
  },[])
  
 
  const getAllPets = async() => {
    const allPets = await axios.get('/pets/allPets')
    setAllPetsArray(allPets.data)
  }



  useEffect(()=>{
    getAllPets()
  },[])



  const location = useLocation()
  
  useEffect(()=>{
    location.pathname = "/"
  },[])

  const tokenFromLocalforage = async() => {
    const tokenString = await localforage.getItem('token');
    const token = JSON.parse(tokenString)
    const headers = {Authorization: `Bearer ${token}`}
    return headers
}

  const signOut = () => {
    location.pathname = "/"
    setLoggedInInfo(null)
    setAdminInfo(null)
    setAdminLoggedIn(false)
    localforage.setItem('token', '');
}
 

  function openModal() {
    setModalIsOpen(true);
  }


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSidebar({ ...sidebar, [anchor]: open });
  };

  const navHome = () => {
    setSearchBeforeLogin(false)
  }
  const navSearchBeforeLogin = () => {
    setSearchBeforeLogin(true)
  }
  const list = (anchor) => (
    <Box
      sx={{ background: 'rgb(44, 44, 198)', height: '100vh', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List  sx={{
              background: 'rgb(44, 44, 198)',
            }}>
        {[<div onClick={()=>navHome()}>Home</div>, <div onClick={()=>navSearchBeforeLogin()}>Search Pets</div>].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText  sx={{ height: '100%', width: '100%'}} primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );



  return (
    <AppContext.Provider value={{
      modalIsOpen,
      setModalIsOpen,
      loggedInInfo,
      setLoggedInInfo,
      myPetsArray,
      setMyPetsArray,
      savedPetsArray,
      setSavedPetsArray,
      allPetsArray,
      setAllPetsArray,
      tokenFromLocalforage,
      setAdminInfo,
      adminInfo,
      setAdminLoggedIn,
      signOut,
      petImages,
      setAllPublicUsersArray,
      setAllAdminUsersArray,
      allAdminUsersArray,
      allPublicUsersArray,
      viewedUserDetails,
      setViewedUserDetails,
      petDetailsToEdit,
      setPetDetailsToEdit,
      setPetImages,
      importAllImages,
      toggleDrawer,
      sidebar

    }}>
    
    <div>
      {adminLoggedIn ? <AdminPage /> :
      <>
      {loggedInInfo ? <HomePage /> :<>
        
  
      <nav className={styles.navBar}>
      <div>
      {["left"].map((anchor) => (
        <div key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
          <Drawer
            anchor={anchor}
            open={sidebar[anchor]}
            onClose={toggleDrawer(anchor, false)}
           
          >
            {list(anchor)}
          </Drawer>
        </div>
      ))}
    </div>
      <div onClick={openModal} className={styles.login}>Login</div>
      </nav>

      {searchBeforeLogin ? <SearchPets /> :<h1 className={styles.header}>Welcome to the pet adoption agency!</h1>}
      
      <LoginSignUp /></>}</>}
    </div>
    </AppContext.Provider>
  );
}

export default App;
