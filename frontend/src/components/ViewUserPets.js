import styles from '../styles/AdminPage.module.css';
import { AppContext } from "../components/AppContext"
import DisplayPet from "./DisplayPet"
import DisplayUser from './DisplayUser'
import {useState, useEffect, useContext} from "react"
import axios from 'axios'
import localforage from 'localforage'
import Sidebar from "react-sidebar";
import { Routes, Route, Link, useLocation } from "react-router-dom";

function ViewUserPets() {

  

  const { viewedUserDetails, setViewedUserDetails } = useContext(AppContext);

  const returnToAllUsers = () =>{
    setViewedUserDetails(null)
  }


  return (<div>
      <div onClick={returnToAllUsers}>Return</div>
      <div>{viewedUserDetails.user.email}</div>
      <div>{viewedUserDetails.user.first_name}</div>
      <div>{viewedUserDetails.user.last_name}</div>
      <div>{viewedUserDetails.user.phone}</div>
      <div>{viewedUserDetails.user.bio}</div>
      <div>{viewedUserDetails.user.date_created}</div>
      <div>
      {viewedUserDetails.usersPets && viewedUserDetails.usersPets.map((pet, index) => {  
                    return   (
                            <div className={styles.petHolder} key={index}>
                            <DisplayPet  pet= {pet} index={index}/>
                            </div>
                            )})}
    </div>
   

</div>
  );
}

export default ViewUserPets;