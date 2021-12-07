import {useContext, useState, useEffect} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/MyPetsPage.module.css'
import DisplayPet from './DisplayPet'
import axios from "axios"
import localforage from 'localforage'
import Sidebar from "react-sidebar";
import { Routes, Route, useLocation } from "react-router-dom";




function MyPetsPage() {
    const [viewYourPets, setViewYourPets] = useState(false)
    const [viewSavedPets, setViewSavedPets] = useState(false)

    const { loggedInInfo, savedPetsArray, myPetsArray } = useContext(AppContext);

    useEffect(()=>{
        setViewYourPets(false)
        setViewSavedPets(false)
    },[])

    const toggledYourPets = () => {
        setViewYourPets(true)
        setViewSavedPets(false)
    }
    const toggledSavedPets = () => {
        setViewYourPets(false)
        setViewSavedPets(true)
    }



    return <div className={styles.index}>
        <h1>What would you like to see?</h1>
        <div className={styles.wrapper}>
        <div className={styles.toggleButton} onClick={toggledYourPets}>Your Pets</div>
        <div className={styles.toggleButton} onClick={toggledSavedPets}>Saved Pets</div>
        </div>
        {viewYourPets && myPetsArray.length === 0 && <div>You don't have any pets!</div>}
        {viewSavedPets && savedPetsArray.length === 0 && <div>No pets saved!</div>}
        {viewYourPets && myPetsArray.length !== 0 && 
        <div> {myPetsArray.map((pet, index) => {  
                    return   (
                            <div className={styles.petHolder} key={index}>
                            <DisplayPet  pet= {pet} index={index} myPets={true}/>
                            </div>
                            )})}</div>}
        {viewSavedPets && savedPetsArray.length !== 0 && 
        <div> {savedPetsArray.map((pet, index) => {  
                    return   (
                            <div className={styles.petHolder} key={index}>
                            <DisplayPet  pet= {pet} index={index} savedPets={true}/>
                            </div>
                            )})}</div>}
        
</div>
    }
    export default MyPetsPage