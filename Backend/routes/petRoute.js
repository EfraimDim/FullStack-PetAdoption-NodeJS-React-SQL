const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const {
    authorization,
    checkIfStillAvailable,
    validateBody,
    checkAdminForAllReq
} = require('../middleware/middleware');

const {query} = require('../models/queryModel')

const multer = require('multer');
const {storage} = require('../models/multerModel');
const upload = multer({ storage })

query(
    `CREATE TABLE IF NOT EXISTS pets (
        id INT(200) AUTO_INCREMENT,
        pet_ID VARCHAR(50) NOT NULL,
        type VARCHAR(30) NOT NULL,
        name VARCHAR(30) NOT NULL,
        adoption_status VARCHAR(30) NOT NULL,
        picture_path VARCHAR(100) NOT NULL,
        height INT(3) NOT NULL,
        weight INT(3) NOT NULL,
        color VARCHAR(30) NOT NULL,
        bio VARCHAR(200) NOT NULL,
        hypoallergenic BOOLEAN NOT NULL,
        availability BOOLEAN NOT NULL DEFAULT TRUE,
        dietry_restrictions VARCHAR(100) NOT NULL,
        breed VARCHAR(20) NOT NULL,
        date_created DATE DEFAULT (CURRENT_DATE),
        PRIMARY KEY (id))`
).then(() => console.log("Table Created"))
.catch((err) => console.log(err))

query(
    `CREATE TABLE IF NOT EXISTS savedPets (
        id INT(200) AUTO_INCREMENT,
        user_ID VARCHAR(50) NOT NULL,
        pet_ID VARCHAR(50) NOT NULL,
        PRIMARY KEY (id))`
).then(() => console.log("Table Created"))
.catch((err) => console.log(err))

query(
    `CREATE TABLE IF NOT EXISTS adoptedPets (
        id INT(200) AUTO_INCREMENT,
        user_ID VARCHAR(50) NOT NULL,
        pet_ID VARCHAR(50) NOT NULL,
        PRIMARY KEY (id))`
).then(() => console.log("Table Created"))
.catch((err) => console.log(err))


const Schemas = require('../schemas/allSchemas');


router.get(
    '/savedPets',
    authorization,
    petController.getSavedPetsArray
)

router.get(
    '/adoptedPets',
    authorization,
    petController.getAdoptedPetsArray
)
router.get(
    '/allPets',
    petController.getAllPetsArray
)
router.delete(
    '/returnForAdoption/:petID',
    authorization,
    petController.returnForAdoption
)
router.put(
    '/fosterToAdopt',
    authorization,
    petController.fosterToAdopt
)

router.delete(
    '/unsavePet/:petID',
    authorization,
    petController.unsavePet
)

router.post(
    '/savePet',
    authorization,
    petController.savePet
)

router.post(
    '/adoptPet',
    authorization,
    checkIfStillAvailable,
    petController.adoptPet
)

router.post(
    '/fosterPet',
    authorization,
    checkIfStillAvailable,
    petController.fosterPet
)
router.get(
    '/basicSearch',
    authorization,
    petController.basicSearch
)
router.get(
    '/advanceSearch/:type/:adoptionStatus/:minHeight/:maxHeight/:minWeight/:maxWeight',
    authorization,
    petController.advanceSearch
)

router.post(
    '/addPet',
    authorization,
    checkAdminForAllReq, 
    upload.single('image'),
    petController.addPet
)

router.put(
    '/editPetWithoutNewPhoto',
    authorization,
    checkAdminForAllReq, 
    petController.editPetWithoutNewPhoto
)

router.put(
    '/editPetWithNewPhoto',
    authorization,
    checkAdminForAllReq,
    upload.single('image'), 
    petController.editPetWithNewPhoto
)




module.exports = router;