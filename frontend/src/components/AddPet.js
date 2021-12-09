import styles from '../styles/AdminPage.module.css';
import { AppContext } from "../components/AppContext"
import {useState, useEffect, useContext} from "react"
import axios from 'axios'
import localforage from 'localforage'
import Sidebar from "react-sidebar";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { createRef } from 'react'


function AddPet() {

    const [type, setType] = useState("dog")
    const [adoptionStatus, setAdoptionStatus] = useState('available')
    const [petName, setPetName] = useState('')
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [colour, setColour] = useState('')
    const [bio, setBio] = useState('')
    const [hypoallergenic, setHypoallergenic] = useState(false)
    const [dietryRestrictions, setDietryRestrictions] = useState('')
    const [breed, setBreed] = useState('')

    const { } = useContext(AppContext);
    const fileInputRef = createRef()

    const handleType = (e) => {
        setType(e.target.value)
    }
    const handleAdoptionStatus = (e) =>{
        setAdoptionStatus(e.target.value)
    }

    const handlePetName = (e) => {
        setPetName(e.target.value)
    }
    const handleHeight = (e) => {
        setHeight(e.target.value)
    }
   
    const handleWeight = (e) => {
        setWeight(e.target.value)
    }
    const handleColour = (e) => {
        setColour(e.target.value)
    }
    const handleBio = (e) => {
        setBio(e.target.value)
    }
    const handleHypoallergenic = (e) => {
        setHypoallergenic(e.target.value)
    }
    const handleDietryRestrictions = (e) => {
        setDietryRestrictions(e.target.value)
    }
    const handleBreed = (e) => {
        setBreed(e.target.value)
    }

    const addPet = async(e) =>{
        e.preventDefault()
        const tokenString = await localforage.getItem('token');
        const token = JSON.parse(tokenString)
        const headers = {Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'}
        const fd = new FormData();
        const file = fileInputRef.current.files[0]
        fd.append('image', file, `${file.name}`);
        fd.append('type', type);
        fd.append('adoptionStatus', adoptionStatus)
        fd.append('name', petName);
        fd.append('colour', colour)
        fd.append('height', height);
        fd.append('weight', weight)
        fd.append('bio', bio)
        fd.append('dietryRestrictions', dietryRestrictions);
        fd.append('hypoallergenic', hypoallergenic);
        fd.append('breed', breed)
        const addPet = await axios.post("/pets/addPet", fd ,{headers:headers})
    }




  return (
    <div>
        <form onSubmit={addPet}>
                <select required value={type} onChange={handleType}>
                    <option defaultValue value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                </select>
                <select required value={adoptionStatus} onChange={handleAdoptionStatus}>
                    <option defaultValue value="available">Available</option>
                    <option value="adopted">Adopted</option>
                    <option value="fostered">Fostered</option>
                </select>
                <input required className={styles.input} type="text" value={petName} onChange={handlePetName} placeholder="name" />
                <input required className={styles.input} type="text" value={colour} onChange={handleColour} placeholder="colour" />
                <input required className={styles.input} min={0} max={200} type="number" value={height} onChange={handleHeight} placeholder="height (cm)" />
                <input required className={styles.input} min={0} max={50} type="number" value={weight} onChange={handleWeight} placeholder="weight (kg)" />
                <input required className={styles.input} type="text" value={bio} onChange={handleBio} placeholder="pet bio" />
                <select required value={hypoallergenic} onChange={handleHypoallergenic}>
                    <option defaultValue value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <input required className={styles.input} type="text" value={dietryRestrictions} onChange={handleDietryRestrictions} placeholder="dietry restrictions" />
                <input required className={styles.input} type="text" value={breed} onChange={handleBreed} placeholder="breed" />
                <input type="file" accept="image/png, image/gif, image/jpeg" required ref={fileInputRef} />
            <button className={styles.submit} type="submit">add Pet!</button>
            </form>
    </div>

  );
}

export default AddPet;