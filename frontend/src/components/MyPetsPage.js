import {useContext, useState, useEffect} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/MyPetsPage.module.css'
import DisplayPet from './DisplayPet'
import axios from "axios"
import localforage from 'localforage'
import { Routes, Route, useLocation } from "react-router-dom";




function MyPetsPage() {
    const [viewYourPets, setViewYourPets] = useState(false)
    const [viewSavedPets, setViewSavedPets] = useState(false)

    const { savedPetsArray, myPetsArray } = useContext(AppContext);

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



    return <div>
        <h1>What would you like to see?</h1>
        <div className={styles.wrapper}>
        <button className={styles.toggleButton} onClick={toggledYourPets}>Your Pets</button>
        <button className={styles.toggleButton} onClick={toggledSavedPets}>Saved Pets</button>
        </div>
        {viewYourPets && myPetsArray.length === 0 && <div className={styles.noPets}>You don't have any pets!</div>}
        {viewSavedPets && savedPetsArray.length === 0 && <div className={styles.noPets}>No pets saved!</div>}
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