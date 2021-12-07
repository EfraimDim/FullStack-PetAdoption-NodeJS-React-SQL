"use strict";

var express = require('express');

var router = express.Router();

var petController = require('../controllers/petController');

var _require = require('../middleware/middleware'),
    authorization = _require.authorization,
    checkIfStillAvailable = _require.checkIfStillAvailable,
    validateBody = _require.validateBody;

var _require2 = require('../models/queryModel'),
    query = _require2.query;

query("CREATE TABLE IF NOT EXISTS pets (\n        id INT(200) AUTO_INCREMENT,\n        pet_ID VARCHAR(30) NOT NULL,\n        type VARCHAR(30) NOT NULL,\n        name VARCHAR(30) NOT NULL,\n        adoption_status VARCHAR(30) NOT NULL,\n        picture_path VARCHAR(100) NOT NULL,\n        height INT(10) NOT NULL,\n        weight INT(10) NOT NULL,\n        color VARCHAR(10) NOT NULL,\n        bio VARCHAR(200) NOT NULL,\n        hypoallergenic BOOLEAN NOT NULL,\n        availability BOOLEAN NOT NULL DEFAULT TRUE,\n        dietry_restrictions VARCHAR(100) NOT NULL,\n        breed VARCHAR(20) NOT NULL,\n        date_created DATE DEFAULT (CURRENT_DATE),\n        PRIMARY KEY (id))").then(function () {
  return console.log("Table Created");
})["catch"](function (err) {
  return console.log(err);
});
query("CREATE TABLE IF NOT EXISTS savedPets (\n        id INT(200) AUTO_INCREMENT,\n        user_ID VARCHAR(50) NOT NULL,\n        pet_ID VARCHAR(50) NOT NULL,\n        PRIMARY KEY (id))").then(function () {
  return console.log("Table Created");
})["catch"](function (err) {
  return console.log(err);
});
query("CREATE TABLE IF NOT EXISTS adoptedPets (\n        id INT(200) AUTO_INCREMENT,\n        user_ID VARCHAR(50) NOT NULL,\n        pet_ID VARCHAR(50) NOT NULL,\n        PRIMARY KEY (id))").then(function () {
  return console.log("Table Created");
})["catch"](function (err) {
  return console.log(err);
});

var Schemas = require('../schemas/allSchemas');

router.get('/savedPets', authorization, petController.getSavedPetsArray);
router.get('/adoptedPets', authorization, petController.getAdoptedPetsArray);
router.get('/allPets', petController.getAllPetsArray);
router["delete"]('/returnForAdoption/:petID', authorization, petController.returnForAdoption);
router.put('/fosterToAdopt', authorization, petController.fosterToAdopt);
router["delete"]('/unsavePet/:petID', authorization, petController.unsavePet);
router.post('/savePet', authorization, petController.savePet);
router.post('/adoptPet', authorization, checkIfStillAvailable, petController.adoptPet);
router.post('/fosterPet', authorization, checkIfStillAvailable, petController.fosterPet); // router.get(
//     '/getPrivatePostToEdit',
//     authorization,
//     petController.getPrivatePostToEdit
// )
// router.put(
//     '/editPost',
//     validateBody(Schemas.editPostSchemaAJV),
//     authorization,
//     authorizeEdit,
//     petController.editPost
// )
// router.get(
//     '/getAllPosts',
//     petController.getAllPosts
// )
// router.post(
//     '/addPost',
//     validateBody(Schemas.postSubmitSchemaAJV),
//     authorization,
//     petController.addPost
// )
// router.post(
//     '/searchPostTitle',
//     validateBody(Schemas.searchTermSchemaAJV),
//     petController.searchPostTitle
// )
// router.get('/getPostToView',
//     authorization,
//     checkIfViewed,
//     petController.getPostToView
// )
// router.get('/getPrivatePostID',
//     authorization,
//     petController.getPrivatePostID
//     )

module.exports = router;