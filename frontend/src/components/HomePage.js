import {useContext, useState, useEffect} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/HomePage.module.css'
import axios from "axios"
import localforage from 'localforage'
import Sidebar from "react-sidebar";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Profile from './Profile'
import MyPetsPage from './MyPetsPage'
import SearchPets from './SearchPets'





function HomePage() {

   const [sideBarOpen, setSideBarOpen] = useState(false)

    const { loggedInInfo, setLoggedInInfo, setSavedPetsArray, setMyPetsArray } = useContext(AppContext);
    const location = useLocation()

  
    const getSavedPets = async() => {
      const tokenString = await localforage.getItem('token');
      const token = JSON.parse(tokenString)
      const headers = {Authorization: `Bearer ${token}`}
      const savedPets = await axios.get('/pets/savedPets', {headers:headers})
      setSavedPetsArray(savedPets.data)
    }
  
    const getMyPets = async() => {
      const tokenString = await localforage.getItem('token');
      const token = JSON.parse(tokenString)
      const headers = {Authorization: `Bearer ${token}`}
      const myPets = await axios.get('/pets/adoptedPets', {headers:headers})
      setMyPetsArray(myPets.data)
    }

    useEffect(()=>{
      location.pathname = "/"
    },[])

    useEffect(()=>{
      getSavedPets()
    },[])
  
    useEffect(()=>{
      getMyPets()
    },[])

    const signOut = () => {
        setLoggedInInfo(null)
        localforage.setItem('token', '');
    }

    const onSetSidebarOpen = (open) => {
        setSideBarOpen(open);
      }


    return <div >
 <nav className={styles.navBar}>

<div>
 <Sidebar
        sidebar={<>
        <Link to="/"><div onClick={() => onSetSidebarOpen(false)} className={styles.sideBarButtons}>Home</div></Link>
        <Link to="/petsPage"><div onClick={() => onSetSidebarOpen(false)} className={styles.sideBarButtons}>My Pets Page</div></Link>
        <Link to="/myProfile"><div onClick={() => onSetSidebarOpen(false)} className={styles.sideBarButtons}>Profile Settings</div></Link>
        <Link to="/searchPets"><div onClick={() => onSetSidebarOpen(false)} className={styles.sideBarButtons}>Search Pets</div></Link></>
    }
        open={sideBarOpen}
        onSetOpen={onSetSidebarOpen}
        shadow={false}
        styles={{ sidebar: { background: "rgb(44, 44, 198)"} }}
      >
        <div className={styles.sideBarOpen} onClick={() => onSetSidebarOpen(true)}>
          Menu
        </div>
      </Sidebar>
      </div>
      <div onClick={signOut} className={styles.signOut}>Sign Out</div>
      </nav>

      <div className={styles.index}>
    <Routes>
    <Route path="/myProfile" element={<Profile/>}></Route> 
    <Route path="/petsPage" element={<MyPetsPage/>}></Route>
    <Route path="/searchPets" element={<SearchPets/>}></Route>
    <Route path='/' element={<h1 className={styles.header}>Welcome {loggedInInfo.first_name} {loggedInInfo.last_name} to your pet adoption account!</h1>}></Route>
    </Routes>
    </div>

</div>
    }
    export default HomePage