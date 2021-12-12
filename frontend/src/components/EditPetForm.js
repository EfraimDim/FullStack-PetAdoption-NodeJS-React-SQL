import styles from '../styles/AdminPage.module.css';
import { AppContext } from "./AppContext"
import {useState, useEffect, useContext} from "react"
import axios from 'axios'
import localforage from 'localforage'
import { createRef } from 'react'
import { Routes, Route, Link, useLocation } from "react-router-dom";

function EditPetForm() {


  const { setPetDetailsToEdit, petDetailsToEdit, petImages, tokenFromLocalforage, allPetsArray, setAllPetsArray, setLoadSpinner } = useContext(AppContext);

  const [picturePath, setPicturePath] = useState(petDetailsToEdit.picture_path)
  const [type, setType] = useState(petDetailsToEdit.type)
  const [adoptionStatus, setAdoptionStatus] = useState(petDetailsToEdit.adoption_status)
  const [petName, setPetName] = useState(petDetailsToEdit.name)
  const [height, setHeight] = useState(petDetailsToEdit.height)
  const [weight, setWeight] = useState(petDetailsToEdit.weight)
  const [colour, setColour] = useState(petDetailsToEdit.color)
  const [bio, setBio] = useState(petDetailsToEdit.bio)
  const [hypoallergenic, setHypoallergenic] = useState(petDetailsToEdit.hypoallergenic)
  const [dietryRestrictions, setDietryRestrictions] = useState(petDetailsToEdit.dietry_restrictions)
  const [breed, setBreed] = useState(petDetailsToEdit.breed)
  const [selectedFile, setSelectedFile] = useState(null);

  
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
  const handleFileInput = () => {
    setSelectedFile(fileInputRef.current.files[0])
}


  const returnToSearch = () =>{
    setPetDetailsToEdit(null)
  }

  const editPet = async(e) => {
    e.preventDefault()
    try{
    setLoadSpinner(true)
    if(selectedFile === null){
        const headers = await tokenFromLocalforage()
        const editPetWithoutNewPhoto = await axios.put("http://localhost:5000/pets/editPetWithoutNewPhoto", {
            type: type,
            adoptionStatus: adoptionStatus,
            name: petName,
            colour: colour,
            height: height,
            weight: weight,
            bio: bio,
            dietryRestrictions: dietryRestrictions,
            hypoallergenic: hypoallergenic,
            breed: breed,
            petID: petDetailsToEdit.pet_ID
        } ,{headers:headers})
        const newAllPetsArray = [...allPetsArray]
        const indexFromAllPets = newAllPetsArray.findIndex(oldPet => oldPet.pet_ID === petDetailsToEdit.pet_ID)
        const petToUpdate = newAllPetsArray[indexFromAllPets]
        let availability = 0
        if(adoptionStatus === "available"){
            availability = 1
        }
        petToUpdate.type = type
        petToUpdate.adoption_status = adoptionStatus
        petToUpdate.name = petName
        petToUpdate.color = colour
        petToUpdate.height = height
        petToUpdate.weight = weight
        petToUpdate.bio = bio
        petToUpdate.dietry_restrictions = dietryRestrictions
        petToUpdate.hypoallergenic = hypoallergenic
        petToUpdate.breed = breed
        petToUpdate.availability = availability
        newAllPetsArray[indexFromAllPets] = petToUpdate
        setAllPetsArray(newAllPetsArray)
        setLoadSpinner(false) 
        alert(editPetWithoutNewPhoto.data)
        setPetDetailsToEdit(null)
    }else{
        const tokenString = await localforage.getItem('token');
        const token = JSON.parse(tokenString)
        const headers = {Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'}
        const fd = new FormData();
        fd.append('image', selectedFile, `${selectedFile.name}`);
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
        fd.append('petID', petDetailsToEdit.pet_ID)
        const editPetWithNewPhoto = await axios.put("http://localhost:5000/pets/editPetWithNewPhoto", fd ,{headers:headers})
        setLoadSpinner(false) 
        alert(editPetWithNewPhoto.data)
        setPetDetailsToEdit(null)
    }  
    }catch(e){
        console.log(e)
        setLoadSpinner(false) 
        }
  }


  return (
    <div>
       
           <button onClick={returnToSearch}>Return</button>
           <img className={styles.image} src={petImages[`${picturePath}`].default} />
         <form onSubmit={editPet}>
                 <select required value={type} onChange={handleType}>
                     <option defaultValue={petDetailsToEdit.type === "dog"} value="dog">Dog</option>
                     <option defaultValue={petDetailsToEdit.type === "cat"} value="cat">Cat</option>
                     <option defaultValue={petDetailsToEdit.type === "bird"} value="bird">Bird</option>
                     <option defaultValue={petDetailsToEdit.type === "fish"}  value="fish">Fish</option>
                 </select>
                 <select required value={adoptionStatus} onChange={handleAdoptionStatus}>
                     <option defaultValue={petDetailsToEdit.adoption_status === "available"} value="available">Available</option>
                     <option defaultValue={petDetailsToEdit.adoption_status === "adopted"} value="adopted">Adopted</option>
                     <option defaultValue={petDetailsToEdit.adoption_status === "fostered"} value="fostered">Fostered</option>
                 </select>
                 <input required className={styles.input} type="text" value={petName} maxLength={"15"} onChange={handlePetName} placeholder="name" />
                 <input required className={styles.input} type="text" value={colour} maxLength={"30"} onChange={handleColour} placeholder="colour" />
                 <input required className={styles.input} min={0} max={200} type="number" value={height} onChange={handleHeight} placeholder="height (cm)" />
                 <input required className={styles.input} min={0} max={50} type="number" value={weight} onChange={handleWeight} placeholder="weight (kg)" />
                 <input required className={styles.input} type="text" value={bio} maxLength={"200"} onChange={handleBio} placeholder="pet bio" />
                 <label>hypoallergenic:</label>
                 <select required value={hypoallergenic} onChange={handleHypoallergenic}>
                    <option defaultValue={petDetailsToEdit.hypoallergenic === true} value={true}>Yes</option>
                     <option defaultValue={petDetailsToEdit.hypoallergenic === false} value={false}>No</option>
                 </select>
                 <input required className={styles.input} type="text" value={dietryRestrictions} maxLength={"100"} onChange={handleDietryRestrictions} placeholder="dietry restrictions" />
                 <input required className={styles.input} type="text" value={breed} maxLength={"20"} onChange={handleBreed} placeholder="breed" />
                 <input type={"file"} accept={"image/png, image/gif, image/jpeg"}  ref={fileInputRef} onChange={handleFileInput} />
             <button className={styles.submit} type="submit">Edit Pet!</button>
             </form>
   
     
    </div>

  );
}

export default EditPetForm;