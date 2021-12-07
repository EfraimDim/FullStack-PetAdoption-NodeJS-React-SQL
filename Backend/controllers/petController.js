const {query} = require('../models/queryModel')



exports.getSavedPetsArray = async(req, res) => {
    try {
        const {userID} = req.decoded
        const savedPetsArray = await query(`SELECT * FROM pets JOIN savedPets on pets.pet_ID = savedPets.pet_ID WHERE user_ID = "${userID}"`)
        res.send(savedPetsArray)
    } catch (e) {
        console.error(e)
    }
}
exports.getAdoptedPetsArray = async(req, res) => {
    try {
        const {userID} = req.decoded
        const adoptedPetsArray = await query(`SELECT * FROM pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID WHERE user_ID = "${userID}"`)
        res.send(adoptedPetsArray)
    } catch (e) {
        console.error(e)
    }
}

exports.getAllPetsArray = async(req, res) => {
    try {
        const allPetsArray = await query(`SELECT * FROM pets`)
        res.send(allPetsArray)
    } catch (e) {
        console.error(e)
    }
}


exports.returnForAdoption  = async(req, res) => {
    try{
    const { petID } = req.params
    const {userID} = req.decoded
    const deleteFromMyPetsArray = await query(`DELETE FROM adoptedPets WHERE user_ID = "${userID}" AND pet_ID = "${petID}";`)
    const updateAdoptionStatus = await query(`UPDATE pets SET adoption_status = "available", availability = TRUE  WHERE pet_ID = "${petID}"`)
    res.send("Returned Succesfully!")
}catch (e) {
    console.error(e)
}}

exports.fosterToAdopt = async(req, res) => {
    try{
    const { petID } = req.body
    const updateAdoptionStatus = await query(`UPDATE pets SET adoption_status = "adopted"  WHERE pet_ID = "${petID}"`)
    res.send("Updated Succesfully!")
}catch (e) {
    console.error(e)
}}

exports.unsavePet  = async(req, res) => {
    try{
    const { petID } = req.params
    const {userID} = req.decoded
    const deleteFromSavedPetsArray = await query(`DELETE FROM savedPets WHERE user_ID = "${userID}" AND pet_ID = "${petID}";`)
    res.send("Unsaved Succesfully!")
}catch (e) {
    console.error(e)
}}

exports.savePet  = async(req, res) => {
    try{
    const { petID } = req.body
    const {userID} = req.decoded
    const savePet = await query(`INSERT INTO savedPets (user_ID, pet_ID) VALUES ("${userID}", "${petID}")`)
    res.send("Saved Succesfully!")
}catch (e) {
    console.error(e)
}}

exports.adoptPet  = async(req, res) => {
    try{
    const { petID } = req.body
    const {userID} = req.decoded
    const adoptPet = await query(`INSERT INTO adoptedPets (user_ID, pet_ID) VALUES ("${userID}", "${petID}")`)
    const availabilityChange = await query(`UPDATE pets SET adoption_status = "adopted", availability = FALSE WHERE pet_ID = "${petID}"`)
    res.send("Adoption Success!")
}catch (e) {
    console.error(e)
}}

exports.fosterPet  = async(req, res) => {
    try{
    const { petID } = req.body
    const {userID} = req.decoded
    const fosterPet = await query(`INSERT INTO adoptedPets (user_ID, pet_ID) VALUES ("${userID}", "${petID}")`)
    const availabilityChange = await query(`UPDATE pets SET adoption_status = "fostered", availability = FALSE WHERE pet_ID = "${petID}"`)
    res.send("Foster Success!")
}catch (e) {
    console.error(e)
}}

exports.basicSearch = async(req, res) =>{
    try {
        const {type} = req.query
        const searchResults = await query(`SELECT * FROM pets WHERE type = "${type}"`)
        res.send(searchResults)
    } catch (error) {
        console.log(error)
    }
}

exports.advanceSearch = async(req, res) =>{
    try {
        const {type, adoptionStatus, minHeight, maxHeight, minWeight, maxWeight} = req.params
        const {name} = req.query
        const searchResults = await query(`SELECT * FROM pets WHERE type = "${type}" AND adoption_status = "${adoptionStatus}" AND weight >= ${minWeight} AND weight <= ${maxWeight} AND height >= ${minHeight} AND height <= ${maxHeight} AND name LIKE '%${name}%'`)
        res.send(searchResults)
    } catch (error) {
        console.log(error)
    }
}








