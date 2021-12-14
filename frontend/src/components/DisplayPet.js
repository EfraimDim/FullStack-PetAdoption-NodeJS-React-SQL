import { useContext } from "react"
import {AppContext} from "./AppContext"
import styles from "../styles/DisplayPet.module.css"
import ShowMore from 'react-show-more';
import axios from 'axios'
import swal from 'sweetalert'







function DisplayPet({pet, index, myPets, savedPets, allPets}) {

    const { loggedInInfo, petImages, setSavedPetsArray, setMyPetsArray, myPetsArray, savedPetsArray, allPetsArray, setAllPetsArray, tokenFromLocalforage,  setPetDetailsToEdit, adminInfo, setLoadSpinner } = useContext(AppContext);



    const returnForAdoption = async(petID, index) => {
    try{
        swal({
            title: "Are you sure?",
            text: "Return pet for adoption",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willReturn) => {
            if (willReturn) {
                const headers = await tokenFromLocalforage()
                const returnForAdoption = await axios.delete(`http://localhost:5000/pets/returnForAdoption/${petID}`, {headers:headers})
                const newPetsArray = myPetsArray.filter(pet => pet.pet_ID !== petID)
                setMyPetsArray(newPetsArray)
                const newAllPetsArray = [...allPetsArray]
                const indexFromAllPets = newAllPetsArray.findIndex(pet => pet.pet_ID === petID)
                const petToUpdate = newAllPetsArray[indexFromAllPets]
                petToUpdate.availability = 1
                petToUpdate.adoption_status = "available"
                newAllPetsArray[indexFromAllPets] = petToUpdate
                setAllPetsArray(newAllPetsArray)
              swal("Pet Returned!", {
                icon: "success",
              });
            } else {
              swal("Your pet is still with you!");
            }
          });
    }catch(e){
        console.log(e) 
        swal({
            title: "Return Failed!",
            text: `Error: ${e}`,
            icon: "error",
            button: "return",
          });
        }
    }
    const fosterToAdopt = async(petID, index) => {
    try{
        swal({
            title: "Are you sure?",
            text: "Change from fostering to adopting",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willAdopt) => {
            if (willAdopt) {
                const headers = await tokenFromLocalforage()
                const changeFromFosterToAdopt = await axios.put(`http://localhost:5000/pets/fosterToAdopt`, {
                    petID: petID
                }, {headers:headers})
                const newPetsArray = [...myPetsArray]
                const petToChange = newPetsArray.find(pet => pet.pet_ID === petID)
                petToChange.adoption_status = "adopted"
                newPetsArray[index] = petToChange
                setMyPetsArray(newPetsArray)
              swal("Adoption Success!", {
                icon: "success",
              });
            } else {
              swal("Adoption Cancelled!");
            }
          });
    }catch(e){
        console.log(e)
        swal({
            title: "Adoption Failed!",
            text: `Error: ${e}`,
            icon: "error",
            button: "return",
          });
        }
    }
    const unsavePet = async(petID, index) => {
    try{
        const headers = await tokenFromLocalforage()
        const unsavePet = await axios.delete(`http://localhost:5000/pets/unsavePet/${petID}`, {headers:headers})
        const newSavedPetsArray = savedPetsArray.filter(pet => pet.pet_ID !== petID)
        setSavedPetsArray(newSavedPetsArray)
        swal({
            title: "Pet Unsaved!",
            icon: "success",
            button: "return",
          });
    }catch(e){
        console.log(e)
        swal({
            title: "Unsave Failed!",
            text: `Error: ${e}`,
            icon: "error",
            button: "return",
          });
        }
    }
    const savePet = async(petID, pet) => {
    try{
        const headers = await tokenFromLocalforage()
        const savePet = await axios.post(`http://localhost:5000/pets/savePet`, {
            petID: petID
        }, {headers:headers})
        setSavedPetsArray([...savedPetsArray, pet])
        swal({
            title: "Pet Saved!",
            icon: "success",
            button: "return",
          });
    }catch(e){
        console.log(e)
        swal({
            title: "Save Failed!",
            text: `Error: ${e}`,
            icon: "error",
            button: "return",
          }); 
        }
    }

    const adoptPet = async(petID, pet) => {
    try{
        swal({
            title: "Are you sure?",
            text: "Adopting a pet is a big commitment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willAdopt) => {
            if (willAdopt) {
                const headers = await tokenFromLocalforage()
                const adoptPet = await axios.post(`http://localhost:5000/pets/adoptPet`, {
                    petID: petID
                }, {headers:headers})
                pet.adoption_status = "adopted"
                pet.availability = 0
                setMyPetsArray([...myPetsArray, pet])
              swal(`Congratulations! You adopted ${pet.name}`, {
                icon: "success",
              });
            } else {
              swal("Adoption cancelled!");
            }
          });

    }catch(e){
        console.log(e) 
        swal({
            title: "Adoption Failed!",
            text: `Error: ${e}`,
            icon: "error",
            button: "return",
          });
        }
    }

    const fosterPet = async(petID, pet) => {
    try{
        swal({
            title: "Are you sure?",
            text: "Fostering a pet is a big commitment!!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willFoster) => {
            if (willFoster) {
                const headers = await tokenFromLocalforage()
                const fosterPet = await axios.post(`http://localhost:5000/pets/fosterPet`, {
                    petID: petID
                }, {headers:headers})
                pet.adoption_status = "fostered"
                pet.availability = 0
                setMyPetsArray([...myPetsArray, pet])
              swal(`Congratulations! You are now fostering ${pet.name}`, {
                icon: "success",
              });
            } else {
              swal("Foster Cancelled!");
            }
          });
    }catch(e){
        console.log(e)
        swal({
            title: "Foster Failed!",
            text: `Error: ${e}`,
            icon: "error",
            button: "return",
          }); 
        }
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
        <div className={styles.mainInfo}><span className={styles.field}>Name:</span> {pet.name}</div>
        <div className={styles.mainInfo}><span className={styles.field}>Status:</span> {pet.adoption_status}</div>
    <ShowMore
                lines={1}
                more='Show more'
                less='Show less'
                anchorClass=''
            > 
                {<div className={styles.extraInfoWrapper}><br></br>
                <div className={styles.extraInfo}>
                <div className={styles.info}><span className={styles.field}>Type:</span> {pet.type}</div>
                <div className={styles.info}><span className={styles.field}>Breed:</span> {pet.breed}</div>
                <div className={styles.info}><span className={styles.field}>Height:</span> {pet.height}cm</div>
                <div className={styles.info}><span className={styles.field}>Weigth:</span> {pet.weight}kg</div>
                <div className={styles.info}><span className={styles.field}>Colour:</span> {pet.color}</div>
                </div>
                <div>
                <div className={styles.info}><span className={styles.field}>Bio:</span> {pet.bio}</div>
                <div className={styles.info}><span className={styles.field}>Hypoallergenic:</span> {pet.hypoallergenic === 1 ? <span>yes</span> : <span>no</span>}</div>
                <div className={styles.info}><span className={styles.field}>Availability:</span> {pet.availability === 1 ? <span>Available</span> : <span>Unavailable</span>}</div>
                <div className={styles.info}><span className={styles.field}>Dietry Restrictions:</span> {pet.dietry_restrictions}</div>
                <div className={styles.info}><span className={styles.field}>Date Posted:</span> {pet.date_created.slice(0, 10)}</div>
                </div>
                </div>}

            
            </ShowMore>
                {myPets && loggedInInfo && pet.adoption_status === "fostered" && <button className={styles.button} onClick={() =>fosterToAdopt(pet.pet_ID, index)}>Adopt</button>}

                {loggedInInfo && myPets && <button className={styles.button} onClick={() =>returnForAdoption(pet.pet_ID, index)}>Return to Adoption Centre</button>}

                {loggedInInfo && savedPets &&  <button className={styles.button} onClick={() =>unsavePet(pet.pet_ID, index)}>Unsave</button>}

                {allPets && loggedInInfo && savedPetsArray.filter(savedPet => savedPet.pet_ID === pet.pet_ID).length === 0 && 
                <button className={styles.button} onClick={() =>savePet(pet.pet_ID, pet)}>Save For Later</button>}

                {loggedInInfo && allPets && savedPetsArray.filter(savedPet => savedPet.pet_ID === pet.pet_ID).length !== 0 && 
                <button className={styles.button} onClick={() =>unsavePet(pet.pet_ID, index)}>Unsave</button>}

                {loggedInInfo && allPets && pet.adoption_status === "available" && <>
                <button className={styles.button} onClick={() =>adoptPet(pet.pet_ID, pet)}>Adopt</button>
                <button className={styles.button} onClick={() =>fosterPet(pet.pet_ID, pet)}>Foster</button></>} 

                {loggedInInfo && allPets && myPetsArray.filter(myPet => myPet.pet_ID === pet.pet_ID).length !== 0 && pet.adoption_status === "fostered" &&
                <button className={styles.button} onClick={() =>fosterToAdopt(pet.pet_ID, index)}>Adopt</button>}
                
                {adminInfo &&  <button className={styles.button} onClick={() => goToEditPage(pet)}>Edit Pet</button>}
               
             
                </div>
</>
    }
    export default DisplayPet