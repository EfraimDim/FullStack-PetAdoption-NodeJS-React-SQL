import {useContext, useState} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/HomePage.module.css'
import axios from "axios"
import localforage from 'localforage'
import Sidebar from "react-sidebar";
import { Routes, Route, Link } from "react-router-dom";
import Profile from './Profile'
import MyPetsPage from './MyPetsPage'
import SearchPets from './SearchPets'




function HomePage() {

   const [sideBarOpen, setSideBarOpen] = useState(false)
    const { loggedInInfo, setLoggedInInfo } = useContext(AppContext);

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
          More
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