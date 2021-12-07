import {useContext, useState} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/HomePage.module.css'
import DisplayPet from './DisplayPet'
import axios from "axios"
import localforage from 'localforage'
import Sidebar from "react-sidebar";
import { Routes, Route, useLocation } from "react-router-dom";




function SearchPets() {

    const [displayAllPets, setDisplayAllPets] = useState(true)

    const { allPetsArray } = useContext(AppContext);

    return <div>

            {displayAllPets && allPetsArray.map((pet, index) => {  
                    return   (
                            <div className={styles.petHolder} key={index}>
                            <DisplayPet  pet= {pet} index={index} allPets={true}/>
                            </div>
                            )})}

        </div>
    }
    export default SearchPets