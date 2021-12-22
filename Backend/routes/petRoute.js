const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const {
    authorization,
    checkIfStillAvailable,
    validateBody,
    checkAdminForAllReq
} = require('../middleware/middleware');


const multer = require('multer');
const {storage} = require('../models/multerModel');
const upload = multer({ storage })



const Schemas = require('../schemas/allSchemas');


router.get(
    '/usersPetArrays',
    authorization,
    petController.usersPetArrays
)
router.get(
    '/allPets',
    petController.getAllPetsArray
)
router.delete(
    '/returnForAdoption/:petID/:petName/:petType/:userEmail',
    authorization,
    petController.returnForAdoption
)
router.put(
    '/fosterToAdopt',
    validateBody(Schemas.fosterAndAdoptionSchemaAJV),
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
    validateBody(Schemas.petIDSchemaAJV),
    authorization,
    petController.savePet
)

router.post(
    '/adoptPet',
    validateBody(Schemas.fosterAndAdoptionSchemaAJV),
    authorization,
    checkIfStillAvailable,
    petController.adoptPet
)

router.post(
    '/fosterPet',
    validateBody(Schemas.fosterAndAdoptionSchemaAJV),
    authorization,
    checkIfStillAvailable,
    petController.fosterPet
)
router.get(
    '/basicSearch',
    petController.basicSearch
)
router.get(
    '/advanceSearch/:type/:adoptionStatus/:minHeight/:maxHeight/:minWeight/:maxWeight',
    petController.advanceSearch
)

router.post(
    '/addPet',
    authorization,
    checkAdminForAllReq, 
    upload.single('image'),
    validateBody(Schemas.addOrEditPetSchemaAJV),
    petController.addPet
)

router.put(
    '/editPetWithoutNewPhoto',
    validateBody(Schemas.editPetWithoutPhotoSchemaAJV),
    authorization,
    checkAdminForAllReq, 
    petController.editPetWithoutNewPhoto
)

router.put(
    '/editPetWithNewPhoto',
    authorization,
    checkAdminForAllReq,
    upload.single('image'),
    validateBody(Schemas.addOrEditPetSchemaAJV), 
    petController.editPetWithNewPhoto
)

router.delete(
    '/deletePet/:petID/:petName/:petType/:adminEmail/:picture_path',
    authorization,
    checkAdminForAllReq,
    petController.deletePet
)



module.exports = router;