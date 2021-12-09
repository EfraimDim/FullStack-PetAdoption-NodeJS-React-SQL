import styles from '../styles/AdminPage.module.css';
import { AppContext } from "../components/AppContext"
import {useState, useEffect, useContext} from "react"
import axios from 'axios'
import localforage from 'localforage'
import Sidebar from "react-sidebar";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AddPet from './AddPet'
import EditPet from './EditPet'
import ViewUsers from './ViewUsers'

function AdminPage() {



  const {  sideBarOpen,  onSetSidebarOpen, signOut } = useContext(AppContext);
  const location = useLocation()

  useEffect(()=>{
    location.pathname = "/"
  },[])






  return (
    <div>
  <nav className={styles.navBar}>

<div>
 <Sidebar
        sidebar={<>
        <Link to="/"><div onClick={() => onSetSidebarOpen(false)} className={styles.sideBarButtons}>Edit Pets</div></Link>
        <Link to="/addPets"><div onClick={() => onSetSidebarOpen(false)} className={styles.sideBarButtons}>Add Pet</div></Link>
        <Link to="/viewUsers"><div onClick={() => onSetSidebarOpen(false)} className={styles.sideBarButtons}>Users</div></Link>
        </>
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
    <Route path="/viewUsers" element={<ViewUsers/>}></Route>
    <Route path='/addPets' element={<AddPet/>}></Route>
    <Route path="/" element={<EditPet/>}></Route>
    </Routes>
    </div>

    </div>

  );
}

export default AdminPage;
