import styles from './styles/App.module.css';
import { AppContext } from "./components/AppContext"
import {useState, useEffect} from "react"
import LoginSignUp from './components/LoginSignUp'
import HomePage from './components/HomePage'
import AdminPage from './components/AdminPage'
import axios from 'axios'
import localforage from 'localforage'
import { useLocation } from "react-router-dom";

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedInInfo, setLoggedInInfo] = useState(null)
  const [adminInfo, setAdminInfo] = useState(null)
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [allPetsArray, setAllPetsArray] = useState([])
  const [savedPetsArray, setSavedPetsArray] = useState([])
  const [myPetsArray, setMyPetsArray] = useState([])
  const [petImages, setPetImages] = useState([])

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
  }

  useEffect(()=>{
    const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
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
    setLoggedInInfo(null)
    setAdminInfo(null)
    setAdminLoggedIn(false)
    localforage.setItem('token', '');
}
 

  function openModal() {
    setModalIsOpen(true);
  }
  const onSetSidebarOpen = (open) => {
    setSideBarOpen(open);
  }



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
      sideBarOpen,
      setSideBarOpen,
      onSetSidebarOpen,
      petImages

    }}>
    
    <div>
      {adminLoggedIn ? <AdminPage /> :
      <>
      {loggedInInfo ? <HomePage /> :<>
      <nav className={styles.navBar}>
      <button></button>
      <div onClick={openModal} className={styles.login}>Login</div>
      </nav>
      <h1 className={styles.header}>Welcome to the pet adoption agency!</h1>
      <LoginSignUp /></>}</>}
    </div>
    </AppContext.Provider>
  );
}

export default App;
