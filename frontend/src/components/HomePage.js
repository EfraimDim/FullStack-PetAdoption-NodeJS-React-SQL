import {useContext, useState, useEffect} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/HomePage.module.css'
import axios from "axios"
import localforage from 'localforage'

import { Routes, Route, Link, useLocation } from "react-router-dom";
import Profile from './Profile'
import MyPetsPage from './MyPetsPage'
import SearchPets from './SearchPets'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';






function HomePage() {

  

    const { loggedInInfo, setSavedPetsArray, setMyPetsArray, signOut, toggleDrawer, sidebar } = useContext(AppContext);
    const location = useLocation()

  
    const getSavedPets = async() => {
      const tokenString = await localforage.getItem('token');
      const token = JSON.parse(tokenString)
      const headers = {Authorization: `Bearer ${token}`}
      const savedPets = await axios.get('http://localhost:3000/pets/savedPets', {headers:headers})
      setSavedPetsArray(savedPets.data)
    }
  
    const getMyPets = async() => {
      const tokenString = await localforage.getItem('token');
      const token = JSON.parse(tokenString)
      const headers = {Authorization: `Bearer ${token}`}
      const myPets = await axios.get('http://localhost:3000/pets/adoptedPets', {headers:headers})
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

    const list = (anchor) => (
      <Box
        sx={{ background: 'rgb(44, 44, 198)', height: '100vh', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {[<Link to="/"><div className={styles.sideBarButtons}>Home</div></Link>, 
          <Link to="/petsPage"><div  className={styles.sideBarButtons}>My Pets Page</div></Link>, 
          <Link to="/myProfile"><div className={styles.sideBarButtons}>Profile Settings</div></Link>, 
          <Link to="/searchPets"><div className={styles.sideBarButtons}>Search Pets</div></Link> ].map((text, index) => (
            <ListItem button key={index}>
              <ListItemText sx={{ height: '100%', width: '100%'}} primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    );



    return <div >
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
      <div onClick={signOut} className={styles.signOut}>Sign Out</div>
      </nav>

      
    <Routes>
    <Route path="/myProfile" element={<Profile/>}></Route> 
    <Route path="/petsPage" element={<MyPetsPage/>}></Route>
    <Route path="/searchPets" element={<SearchPets/>}></Route>
    <Route path='/' element={<h1 className={styles.header}>Welcome {loggedInInfo.first_name} {loggedInInfo.last_name} to your pet adoption account!</h1>}></Route>
    </Routes>
   

</div>
    }
    export default HomePage