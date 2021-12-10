import {useContext, useState} from 'react'
import {AppContext} from './AppContext'
import styles from '../styles/HomePage.module.css'
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

    const { allPetsArray, tokenFromLocalforage } = useContext(AppContext);

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
        e.preventDefault()
        const headers = await tokenFromLocalforage()
        const searchResults = await axios.get(`/pets/basicSearch?type=${typeBasic}`, {headers:headers})
        setSearchedPetArray(searchResults.data)
        setDisplayAllPets(false)

    }
    const handleAdvanceSearch = async(e) => {
        e.preventDefault()
        const headers = await tokenFromLocalforage()
        const searchResults = await axios.get(`/pets/advanceSearch/${typeAdvance}/${adoptionStatus}/${minHeight}/${maxHeight}/${minWeight}/${maxWeight}?name=${petName}`, {headers:headers})
        setSearchedPetArray(searchResults.data)
        setDisplayAllPets(false)

    }

    return <div>
        {basicSearch ? <div onClick={searchSwitch}>Advanced</div> :<div onClick={searchSwitch}>Basic</div>}
        <div onClick={showAllPets}>Show All Pets</div>
            {basicSearch ? 
            <form onSubmit={handleBasicSearch}>
                <select required value={typeBasic} onChange={handleTypeBasic}>
                    <option defaultValue={true} value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    <option value="bulldog">Bulldog</option>
                    </select>
                <button className={styles.submit} type="submit">Search</button>
                </form> : 
            <form onSubmit={handleAdvanceSearch}>
                <select required value={typeAdvance} onChange={handleTypeAdvance}>
                    <option defaultValue={true} value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    <option value="bulldog">Bulldog</option>
                </select>
                <select required value={adoptionStatus} onChange={handleAdoptionStatus}>
                    <option defaultValue={true} value="available">Available</option>
                    <option value="adopted">Adopted</option>
                    <option value="fostered">Fostered</option>
                </select>
                <input className={styles.input} type="text" value={petName} onChange={handlePetName} placeholder="name" />
                <input required className={styles.input} min={0} max={200} type="number" value={minHeight} onChange={handleMinHeight} placeholder="min height (cm)" />
                <input required className={styles.input} min={0} max={200} type="number" value={maxHeight} onChange={handleMaxHeight} placeholder="max height (cm)" />
                <input required className={styles.input} min={0} max={50} type="number" value={minWeight} onChange={handleMinWeight} placeholder="min weight (kg)" />
                <input required className={styles.input} min={0} max={50} type="number" value={maxWeight} onChange={handleMaxWeight} placeholder="max weight (kg)" />
            <button className={styles.submit} type="submit">Search</button>
            </form>}

            <div>
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
        </div>
    }
    export default SearchPets