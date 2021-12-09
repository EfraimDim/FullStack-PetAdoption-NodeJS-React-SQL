import { useContext } from "react"
import {AppContext} from "./AppContext"
import styles from "../styles/DisplayPet.module.css"
import ShowMore from 'react-show-more';
import axios from 'axios'






function DisplayPet({pet, index, myPets, savedPets, allPets}) {

    const { loggedInInfo, petImages, setSavedPetsArray, setMyPetsArray, myPetsArray, savedPetsArray, allPetsArray, setAllPetsArray, tokenFromLocalforage,  setPetDetailsToEdit, adminInfo } = useContext(AppContext);



    const returnForAdoption = async(petID, index) => {
        const headers = await tokenFromLocalforage()
        const returnForAdoption = await axios.delete(`/pets/returnForAdoption/${petID}`, {headers:headers})
        const newPetsArray = myPetsArray.filter(pet => pet.pet_ID !== petID)
        setMyPetsArray(newPetsArray)
        alert(returnForAdoption.data)
        const newAllPetsArray = [...allPetsArray]
        const indexFromAllPets = newAllPetsArray.findIndex(pet => pet.pet_ID === petID)
        const petToUpdate = newAllPetsArray[indexFromAllPets]
        petToUpdate.availability = 1
        petToUpdate.adoption_status = "available"
        newAllPetsArray[indexFromAllPets] = petToUpdate
        setAllPetsArray(newAllPetsArray)
        
    }
    const fosterToAdopt = async(petID, index) => {
        const headers = await tokenFromLocalforage()
        const changeFromFosterToAdopt = await axios.put(`/pets/fosterToAdopt`, {
            petID: petID
        }, {headers:headers})
        const newPetsArray = [...myPetsArray]
        const petToChange = newPetsArray[index]
        petToChange.adoption_status = "adopted"
        newPetsArray[index] = petToChange
        setMyPetsArray(newPetsArray)
        alert(changeFromFosterToAdopt.data)
    }
    const unsavePet = async(petID, index) => {
        const headers = await tokenFromLocalforage()
        const unsavePet = await axios.delete(`/pets/unsavePet/${petID}`, {headers:headers})
        const newSavedPetsArray = savedPetsArray.filter(pet => pet.pet_ID !== petID)
        setSavedPetsArray(newSavedPetsArray)
        alert(unsavePet.data)
    }
    const savePet = async(petID, pet) => {
        const headers = await tokenFromLocalforage()
        const savePet = await axios.post(`/pets/savePet`, {
            petID: petID
        }, {headers:headers})
        setSavedPetsArray([...savedPetsArray, pet])
        alert(savePet.data)
    }

    const adoptPet = async(petID, pet) => {
        const headers = await tokenFromLocalforage()
        const adoptPet = await axios.post(`/pets/adoptPet`, {
            petID: petID
        }, {headers:headers})
        pet.adoption_status = "adopted"
        pet.availability = 0
        setMyPetsArray([...myPetsArray, pet])
    }

    const fosterPet = async(petID, pet) => {
        const headers = await tokenFromLocalforage()
        const fosterPet = await axios.post(`/pets/fosterPet`, {
            petID: petID
        }, {headers:headers})
        pet.adoption_status = "fostered"
        pet.availability = 0
        setMyPetsArray([...myPetsArray, pet])
    }

    const goToEditPage = (pet) => {
        if(pet.hypoallergenic == 1)
        pet.hypoallergenic = true
        else
        pet.hypoallergenic = false
        setPetDetailsToEdit(pet)
    }


    
    return < >  
    <div id={pet.pet_ID} className={styles.petInfo}>
        <img className={styles.image} src={petImages[`${pet.picture_path}`].default} />
        <div className={styles.info}><span className={styles.field}>Name:</span> {pet.name}</div>
        <div className={styles.info}><span className={styles.field}>Status:</span> {pet.adoption_status}</div>
    <ShowMore
                lines={1}
                more='Show more'
                less='Show less'
                anchorClass=''
            >
                {<div><br></br>
                <div className={styles.reduceMargin}><span className={styles.field}>Type:</span> {pet.type}</div>
                <div className={styles.info}><span className={styles.field}>Breed:</span> {pet.breed}</div>
                <div className={styles.info}><span className={styles.field}>Height:</span> {pet.height}cm</div>
                <div className={styles.info}><span className={styles.field}>Weigth:</span> {pet.weight}kg</div>
                <div className={styles.info}><span className={styles.field}>Colour:</span> {pet.color}</div>
                <div className={styles.info}><span className={styles.field}>Bio:</span> {pet.bio}</div>
                <div className={styles.info}><span className={styles.field}>Hypoallergenic:</span> {pet.hypoallergenic === 1 ? <span>yes</span> : <span>no</span>}</div>
                <div className={styles.info}><span className={styles.field}>Availability:</span> {pet.availability === 1 ? <span>Available</span> : <span>Unavailable</span>}</div>
                <div className={styles.info}><span className={styles.field}>Dietry Restrictions:</span> {pet.dietry_restrictions}</div>
                <div className={styles.info}><span className={styles.field}>Date Posted:</span> {pet.date_created}</div>

                {myPets && loggedInInfo && pet.adoption_status === "fostered" && <div onClick={() =>fosterToAdopt(pet.pet_ID, index)}>Adopt</div>}

                {loggedInInfo && myPets && <div onClick={() =>returnForAdoption(pet.pet_ID, index)}>Return to Adoption Centre</div>}

                {loggedInInfo && savedPets &&  <div onClick={() =>unsavePet(pet.pet_ID, index)}>Unsave</div>}

                {allPets && loggedInInfo && savedPetsArray.filter(savedPet => savedPet.pet_ID === pet.pet_ID).length === 0 && 
                <div onClick={() =>savePet(pet.pet_ID, pet)}>Save For Later</div>}

                {loggedInInfo && allPets && savedPetsArray.filter(savedPet => savedPet.pet_ID === pet.pet_ID).length !== 0 && 
                <div onClick={() =>unsavePet(pet.pet_ID, index)}>Unsave</div>}

                {loggedInInfo && allPets && pet.adoption_status === "available" && <>
                <div onClick={() =>adoptPet(pet.pet_ID, pet)}>Adopt</div>
                <div onClick={() =>fosterPet(pet.pet_ID, pet)}>Foster</div></>} 

                {loggedInInfo && allPets && myPetsArray.filter(myPet => myPet.pet_ID === pet.pet_ID).length !== 0 && pet.adoption_status === "fostered" &&
                <div onClick={() =>fosterToAdopt(pet.pet_ID, index)}>Adopt</div>}

             

                </div>}
            
            </ShowMore>
            {adminInfo &&  <div onClick={() => goToEditPage(pet)}>Edit Pet</div>}
               
             
                </div>
</>
    }
    export default DisplayPet