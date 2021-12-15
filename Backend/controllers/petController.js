const SQL = require('@nearform/sql');
const {query} = require('../lib/mysql')
const { v4: uuidv4 } = require('uuid');



exports.usersPetArrays = async(req, res) => {
    try {
        const {userID} = req.decoded
        const savedPetsArray = await query(SQL `SELECT * FROM pets JOIN savedPets on pets.pet_ID = savedPets.pet_ID WHERE user_ID = ${userID}`)
        const adoptedPetsArray = await query(SQL `SELECT * FROM pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID WHERE user_ID = ${userID}`)
        res.send({savedPetsArray: savedPetsArray, adoptedPetsArray: adoptedPetsArray})
    } catch (e) {
        res.status(500).send(e.message)
    }
}


exports.getAllPetsArray = async(req, res) => {
    try {
        const allPetsArray = await query(SQL `SELECT * FROM pets`)
        res.send(allPetsArray)
    } catch (e) {
        console.error(e)
        res.status(500).send(e.message)
    }
}


exports.returnForAdoption  = async(req, res) => {
    try{
    const { petID, petName, petType, userEmail } = req.params
    const {userID} = req.decoded
    const deleteFromMyPetsArray = await query(SQL `DELETE FROM adoptedPets WHERE user_ID = ${userID} AND pet_ID = ${petID};`)
    const updateAdoptionStatus = await query(SQL `UPDATE pets SET adoption_status = "available", availability = TRUE  WHERE pet_ID = ${petID}`)
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("${userEmail} has returned ${petName} the ${petType} back for adoption")`)
    res.send("Returned Succesfully!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.fosterToAdopt = async(req, res) => {
    try{
    const { petID, name, type, userEmail } = req.body
    const updateAdoptionStatus = await query(SQL `UPDATE pets SET adoption_status = "adopted"  WHERE pet_ID = ${petID}`)
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("${userEmail} had now adopted ${name} the ${type} from fostering!")`)
    res.send("Updated Succesfully!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.unsavePet  = async(req, res) => {
    try{
    const { petID } = req.params
    const {userID} = req.decoded
    const deleteFromSavedPetsArray = await query(SQL `DELETE FROM savedPets WHERE user_ID = ${userID} AND pet_ID = ${petID};`)
    res.send("Unsaved Succesfully!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.savePet  = async(req, res) => {
    try{
    const { petID } = req.body
    const {userID} = req.decoded
    const savePet = await query(SQL `INSERT INTO savedPets (user_ID, pet_ID) VALUES (${userID}, ${petID})`)
    res.send("Saved Succesfully!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.adoptPet  = async(req, res) => {
    try{
    const { petID, name, type, userEmail } = req.body
    const {userID} = req.decoded
    const adoptPet = await query(SQL `INSERT INTO adoptedPets (user_ID, pet_ID) VALUES (${userID}, ${petID})`)
    const availabilityChange = await query(SQL `UPDATE pets SET adoption_status = "adopted", availability = FALSE WHERE pet_ID = ${petID}`)
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("${userEmail} had now adopted ${name} the ${type}!")`)
    res.send("Adoption Success!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.fosterPet  = async(req, res) => {
    try{
    const { petID, name, type, userEmail } = req.body
    const {userID} = req.decoded
    const fosterPet = await query(SQL `INSERT INTO adoptedPets (user_ID, pet_ID) VALUES (${userID}, ${petID})`)
    const availabilityChange = await query(SQL `UPDATE pets SET adoption_status = "fostered", availability = FALSE WHERE pet_ID = ${petID}`)
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("${userEmail} is now fostering ${name} the ${type}!")`)
    res.send("Foster Success!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.basicSearch = async(req, res) =>{
    try {
        const {type} = req.query
        const searchResults = await query(SQL `SELECT * FROM pets WHERE type = ${type}`)
        res.send(searchResults)
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.advanceSearch = async(req, res) =>{
    try {
        const {type, adoptionStatus, minHeight, maxHeight, minWeight, maxWeight} = req.params
        const {name} = req.query
        const searchResults = await query(`SELECT * FROM pets WHERE type = "${type}" AND adoption_status = '${adoptionStatus}' AND weight >= ${minWeight} AND weight <= ${maxWeight} AND height >= ${minHeight} AND height <= ${maxHeight} AND name LIKE '%${name}%'`)
        res.send(searchResults)
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}



exports.addPet = async(req, res) =>{
    try {
        const { filename } = req.file
        const { type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail } = req.body
        const parseHeight = JSON.parse(height)
        const parseWeight = JSON.parse(weight)
        const parseHypoallergenic = JSON.parse(hypoallergenic)
        let availability = false
        if(adoptionStatus === "available"){
            availability = true
        }
        const petID = uuidv4()
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        await query(SQL `INSERT INTO pets (pet_ID, type, name, adoption_status, picture_path, height, weight, color, bio, hypoallergenic, availability, dietry_restrictions, breed, date_created) VALUES (${petID}, ${type}, ${name}, ${adoptionStatus}, ${filename}, ${parseHeight}, ${parseWeight}, ${colour}, ${bio}, ${parseHypoallergenic}, ${availability}, ${dietryRestrictions}, ${breed}, ${date})`)
        const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("Admin: ${adminEmail} has added ${name} the ${type} to the database!")`)
        res.send("Added Successfully!")
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.editPetWithNewPhoto = async(req, res) =>{
    try {
        const { filename } = req.file
        const { petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail } = req.body
        const parseHeight = JSON.parse(height)
        const parseWeight = JSON.parse(weight)
        const parseHypoallergenic = JSON.parse(hypoallergenic)
        let availability = false
        if(adoptionStatus === "available"){
            availability = true
        }
        const updatePet = await query(SQL `UPDATE pets SET type = ${type}, adoption_status = ${adoptionStatus}, name = ${name}, color = ${colour}, picture_path = ${filename}, height = ${parseHeight}, weight = ${parseWeight}, bio = ${bio}, dietry_restrictions = ${dietryRestrictions}, hypoallergenic = ${parseHypoallergenic}, breed = ${breed}, availability = ${availability}  WHERE pet_ID = ${petID}`)
        const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("Admin: ${adminEmail} has edited the information of ${name} the ${type} and added a new photo!")`)
        res.send("Updated Successfully!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.editPetWithoutNewPhoto = async(req, res) =>{
    try {
        const { petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail } = req.body
        let availability = false
        if(adoptionStatus === "available"){
            availability = true
        }
        const updatePet = await query(SQL `UPDATE pets SET type = ${type}, adoption_status = ${adoptionStatus}, name = ${name}, color = ${colour}, height = ${height}, weight = ${weight}, bio = ${bio}, dietry_restrictions = ${dietryRestrictions}, hypoallergenic = ${hypoallergenic}, breed = ${breed}, availability = ${availability}  WHERE pet_ID = ${petID}`)
        const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("Admin: ${adminEmail} has edited the information of ${name} the ${type}!")`)
        res.send("Updated Successfully!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.deletePet  = async(req, res) => {
    try{
        const { petID, petName, petType, adminEmail } = req.params
    const deletePet = await query(SQL `DELETE FROM pets WHERE pet_ID = ${petID} `)
    const deletePetAdopted = await query(SQL `DELETE FROM adoptedPets WHERE pet_ID = ${petID} `)
    const deletePetSaved = await query(SQL `DELETE FROM savedPets WHERE pet_ID = ${petID} `)
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("Admin: ${adminEmail} has deleted ${petName} the ${petType} from all databases!")`)
    res.send("Delete Succesful!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}







