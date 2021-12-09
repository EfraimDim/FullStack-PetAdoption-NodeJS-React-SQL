const {query} = require('../models/queryModel')
const { v4: uuidv4 } = require('uuid');



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



exports.addPet = async(req, res) =>{
    try {
        const { filename } = req.file
        const { type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed } = req.body
        const parseHeight = JSON.parse(height)
        const parseWeight = JSON.parse(weight)
        const parseHypoallergenic = JSON.parse(hypoallergenic)
        let availability = false
        if(adoptionStatus === "available"){
            availability = true
        }
        const petID = uuidv4()
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        await query(`INSERT INTO pets (pet_ID, type, name, adoption_status, picture_path, height, weight, color, bio, hypoallergenic, availability, dietry_restrictions, breed, date_created) VALUES ('${petID}', '${type}', '${name}', '${adoptionStatus}', '${filename}', ${parseHeight}, ${parseWeight}, '${colour}', '${bio}', ${parseHypoallergenic}, ${availability}, '${dietryRestrictions}', '${breed}', '${date}')`)
        res.send("Added Successfully!")
    } catch (error) {
        console.log(error)
    }
}

exports.editPetWithNewPhoto = async(req, res) =>{
    try {
        const { filename } = req.file
        const { petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed } = req.body
        const parseHeight = JSON.parse(height)
        const parseWeight = JSON.parse(weight)
        const parseHypoallergenic = JSON.parse(hypoallergenic)
        let availability = false
        if(adoptionStatus === "available"){
            availability = true
        }
        const updatePet = await query(`UPDATE pets SET type = "${type}", adoption_status = "${adoptionStatus}", name = "${name}", color = "${colour}", picture_path = "${filename}", height = ${parseHeight}, weight = ${parseWeight}, bio = "${bio}", dietry_restrictions = "${dietryRestrictions}", hypoallergenic = ${parseHypoallergenic}, breed = "${breed}", availability = ${availability}  WHERE pet_ID = "${petID}"`)
        res.send("Updated Successfully!")
    } catch (error) {
        console.log(error)
    }
}

exports.editPetWithoutNewPhoto = async(req, res) =>{
    try {
        const { petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed } = req.body
        let availability = false
        if(adoptionStatus === "available"){
            availability = true
        }
        const updatePet = await query(`UPDATE pets SET type = "${type}", adoption_status = "${adoptionStatus}", name = "${name}", color = "${colour}", height = ${height}, weight = ${weight}, bio = "${bio}", dietry_restrictions = "${dietryRestrictions}", hypoallergenic = ${hypoallergenic}, breed = "${breed}", availability = ${availability}  WHERE pet_ID = "${petID}"`)
        res.send("Updated Successfully!")
    } catch (error) {
        console.log(error)
    }
}







