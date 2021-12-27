const petQueries = require('../queries/petQueries');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')




exports.usersPetArrays = async (req, res) => {
    try {
        const {userID} = req.decoded
        const petArrays = await petQueries.usersPetArraysQuery(userID)
        res.send({savedPetsArray: petArrays.savedPetsArray, adoptedPetsArray: petArrays.adoptedPetsArray})
    } catch (e) {
        res.status(500).send(e.message)
    }
}


exports.getAllPetsArray = async(req, res) => {
    try {
        const allPetsArray = await petQueries.getAllPetsArrayQuery()
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
    await petQueries.returnForAdoptionQuery(petID, petName, petType, userEmail, userID)
    res.send("Returned Succesfully!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.fosterToAdopt = async(req, res) => {
    try{
    const { petID, name, type, userEmail } = req.body
    await petQueries.fosterToAdoptQuery(petID, name, type, userEmail)
    res.send("Updated Succesfully!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.unsavePet  = async(req, res) => {
    try{
    const { petID } = req.params
    const {userID} = req.decoded
    await petQueries.unsavePetQuery(petID, userID)
    res.send("Unsaved Succesfully!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.savePet = async(req, res) => {
    try{
    const { petID } = req.body
    const {userID} = req.decoded
    await petQueries.savePetQuery(petID, userID)
    res.send("Saved Succesfully!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.adoptPet  = async(req, res) => {
    try{
    const { petID, name, type, userEmail } = req.body
    const {userID} = req.decoded
    await petQueries.adoptPetQuery(petID, name, type, userEmail, userID)
    res.send("Adoption Success!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.fosterPet  = async(req, res) => {
    try{
    const { petID, name, type, userEmail } = req.body
    const {userID} = req.decoded
    await petQueries.fosterPetQuery(petID, name, type, userEmail, userID)
    res.send("Foster Success!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}

exports.basicSearch = async(req, res) =>{
    try {
        const {type} = req.query
        const searchResults = await petQueries.basicSearchQuery(type)
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
        const searchResults = await petQueries.advanceSearchQuery(type, adoptionStatus, minHeight, maxHeight, minWeight, maxWeight, name)
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
        await petQueries.addPetQuery(filename, type, adoptionStatus, name, colour, parseHeight, parseWeight, bio, dietryRestrictions, parseHypoallergenic, breed, adminEmail, availability, petID, date)
        res.send("Added Successfully!")
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.editPetWithNewPhoto = async(req, res) =>{
    try {
        const { filename } = req.file
        const { petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail, oldPicturePath } = req.body
        const parseHeight = JSON.parse(height)
        const parseWeight = JSON.parse(weight)
        const parseHypoallergenic = JSON.parse(hypoallergenic)
        let availability = false
        if(adoptionStatus === "available"){
            availability = true
        }
        await petQueries.editPetWithNewPhotoQuery(filename, petID, type, adoptionStatus, name, colour, parseHeight, parseWeight, bio, dietryRestrictions, parseHypoallergenic, breed, adminEmail, availability)
        fs.unlinkSync(`../frontend/src/images/${oldPicturePath}`);
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
        await petQueries.editPetWithoutNewPhotoQuery(petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail, availability)
        res.send("Updated Successfully!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.deletePet  = async(req, res) => {
    try{
    const { petID, petName, petType, adminEmail, picture_path } = req.params
    await petQueries.deletePetQuery(petID, petName, petType, adminEmail)
    fs.unlinkSync(`../frontend/src/images/${picture_path}`);
    res.send("Delete Succesful!")
}catch (e) {
    console.error(e)
    res.status(500).send(e.message)
}}







