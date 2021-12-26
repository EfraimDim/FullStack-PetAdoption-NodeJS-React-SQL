import {useContext, useState} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/SearchPets.module.css'
import DisplayPet from './DisplayPet'
import axios from "axios"






function SearchPets() {

    const [displayAllPets, setDisplayAllPets] = useState(true)
    const [searchedPetArray, setSearchedPetArray] = useState([])
    const [basicSearch, setBasicSearch] = useState(true)
    const [typeBasic, setTypeBasic] = useState("dog")
    const [typeAdvance, setTypeAdvance] = useState("dog")
    const [adoptionStatus, setAdoptionStatus] = useState('available')
    const [petName, setPetName] = useState('')
    const [minHeight, setMinHeight] = useState(0)
    const [maxHeight, setMaxHeight] = useState(200)
    const [minWeight, setMinWeight] = useState(0)
    const [maxWeight, setMaxWeight] = useState(50)

    const { allPetsArray, tokenFromLocalforage, adminInfo } = useContext(AppContext);

    const showAllPets = () => {
        setDisplayAllPets(true)
    }

    const handleTypeBasic = (e) => {
        setTypeBasic(e.target.value)
    }

    const handleTypeAdvance = (e) => {
        setTypeAdvance(e.target.value)
    }
    const handleAdoptionStatus = (e) =>{
        setAdoptionStatus(e.target.value)
    }

    const handlePetName = (e) => {
        setPetName(e.target.value)
    }
    const handleMinHeight = (e) => {
        setMinHeight(e.target.value)
    }
    const handleMaxHeight = (e) => {
        setMaxHeight(e.target.value)
    }
    const handleMinWeight = (e) => {
        setMinWeight(e.target.value)
    }
    const handleMaxWeight = (e) => {
        setMaxWeight(e.target.value)
    }
    const searchSwitch = () =>{
        setBasicSearch(!basicSearch)
    }
    const handleBasicSearch = async(e) => {
    try{
        e.preventDefault()
        const headers = await tokenFromLocalforage()
        const searchResults = await axios.get(`http://localhost:5000/pets/basicSearch?type=${typeBasic}`, {headers:headers})
        setSearchedPetArray(searchResults.data)
        setDisplayAllPets(false)
    }catch(e){
        console.log(e) 
            }
    }
    const handleAdvanceSearch = async(e) => {
    try{
        e.preventDefault()
        const headers = await tokenFromLocalforage()
        const searchResults = await axios.get(`http://localhost:5000/pets/advanceSearch/${typeAdvance}/${adoptionStatus}/${minHeight}/${maxHeight}/${minWeight}/${maxWeight}?name=${petName}`, {headers:headers})
        setSearchedPetArray(searchResults.data)
        setDisplayAllPets(false)
    }catch(e){
        console.log(e) 
            }
    }

    return (
    <div>
        <div className={styles.searchWrapper}>
            {!adminInfo && <h1 className={styles.header}>Search your new best friend here!</h1>}
            {adminInfo && <h1 className={styles.header}>Search pet to Edit!</h1>}

            {basicSearch ? <button className={styles.button} onClick={searchSwitch}>Advanced</button> :
            <button className={styles.button} onClick={searchSwitch}>Basic</button>}

            <button className={styles.button} onClick={showAllPets}>Show All Pets</button>

            {basicSearch ? 
            <form onSubmit={handleBasicSearch}>
                <label className={styles.label}>Type: </label>
                <select styles={{margin:"10px"}} required value={typeBasic} onChange={handleTypeBasic}>
                    <option defaultValue={true} value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    </select>
                <button className={styles.button} type="submit">Search</button>
                </form> : 
            <form className={styles.advancedSearch} onSubmit={handleAdvanceSearch}>
                <div className={styles.inputWrapper}>
                    <div className={styles.halfOfInputs}>
                        <label className={styles.label}>Type:</label>
                        <select className={styles.input} required value={typeAdvance} onChange={handleTypeAdvance}>
                            <option defaultValue={true} value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="fish">Fish</option>
                        </select>
                        <label className={styles.label}>Status:</label>
                        <select className={styles.input} required value={adoptionStatus} onChange={handleAdoptionStatus}>
                            <option defaultValue={true} value="available">Available</option>
                            <option value="adopted">Adopted</option>
                            <option value="fostered">Fostered</option>
                        </select>
                        <label className={styles.label}>Name:</label>
                        <input className={styles.input} type="text" value={petName} maxLength={"15"} onChange={handlePetName} placeholder="name" />
                    </div>
                    <div className={styles.halfOfInputs}>
                        <label className={styles.label}>Min Height:</label>
                        <input required className={styles.inputNumber} min={0} max={200} type="number" value={minHeight} onChange={handleMinHeight} placeholder="min height (cm)" />
                        <label className={styles.label}>Max Height:</label>
                        <input required className={styles.inputNumber} min={0} max={200} type="number" value={maxHeight} onChange={handleMaxHeight} placeholder="max height (cm)" />
                        <label className={styles.label}>Min Weight:</label>
                        <input required className={styles.inputNumber} min={0} max={50} type="number" value={minWeight} onChange={handleMinWeight} placeholder="min weight (kg)" />
                        <label className={styles.label}>Max Weight:</label>
                        <input required className={styles.inputNumber} min={0} max={50} type="number" value={maxWeight} onChange={handleMaxWeight} placeholder="max weight (kg)" />
                    </div>
                </div>
                <button className={styles.submit} type="submit">Search</button>
            </form>}
        </div>
        <div className={styles.petsArrayWrapper}>
            {displayAllPets ? allPetsArray.map((pet, index) => {  
                    return   (
                            <div className={styles.petHolder} key={index}>
                            <DisplayPet  pet= {pet} index={index} allPets={true}/>
                            </div>
                            )}) :
                            searchedPetArray.map((pet, index) => {  
                                return   (
                                        <div className={styles.petHolder} key={index}>
                                        <DisplayPet  pet= {pet} index={index} allPets={true}/>
                                        </div>
                                        )})
                            } 
        </div>
    </div>)
    }
    export default SearchPets