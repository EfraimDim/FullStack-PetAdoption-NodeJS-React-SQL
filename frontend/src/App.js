import styles from './styles/App.module.css';
import { AppContext } from "./components/AppContext"
import {useState, useEffect} from "react"
import LoginSignUp from './components/LoginSignUp'
import HomePage from './components/HomePage'
import axios from 'axios'
import localforage from 'localforage'

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedInInfo, setLoggedInInfo] = useState(null)
  const [allPetsArray, setAllPetsArray] = useState([])
  const [savedPetsArray, setSavedPetsArray] = useState([])
  const [myPetsArray, setMyPetsArray] = useState([])

  const getAllPets = async() => {
    const allPets = await axios.get('/pets/allPets')
    setAllPetsArray(allPets.data)
  }

 
  

  useEffect(()=>{
    getAllPets()
  },[])

 

  function openModal() {
    setModalIsOpen(true);
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
      setAllPetsArray
    }}>
    
    <div>
      {loggedInInfo ? <HomePage /> :<>
      <nav className={styles.navBar}>
      <button></button>
      <div onClick={openModal} className={styles.login}>Login</div>
      </nav>
      <h1 className={styles.header}>Welcome to the pet adoption agency!</h1>
      <LoginSignUp /></>}
    </div>
    </AppContext.Provider>
  );
}

export default App;
