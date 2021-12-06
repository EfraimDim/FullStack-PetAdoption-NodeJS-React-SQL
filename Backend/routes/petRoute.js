const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const {
    authorization,
    authorizeEdit,
    authorizeDelete,
    validateBody
} = require('../middleware/middleware');

const {query} = require('../models/queryModel')

query(
    `CREATE TABLE IF NOT EXISTS pets (
        id INT(200) AUTO_INCREMENT,
        pet_ID VARCHAR(30) NOT NULL,
        type VARCHAR(30) NOT NULL,
        name VARCHAR(30) NOT NULL,
        adoption_status VARCHAR(30) NOT NULL,
        picture_path VARCHAR(100) NOT NULL,
        height INT(10) NOT NULL,
        weight INT(10) NOT NULL,
        color VARCHAR(10) NOT NULL,
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
        user_ID VARCHAR(30) NOT NULL,
        pet_ID VARCHAR(30) NOT NULL,
        PRIMARY KEY (id))`
).then(() => console.log("Table Created"))
.catch((err) => console.log(err))

query(
    `CREATE TABLE IF NOT EXISTS adoptedPets (
        id INT(200) AUTO_INCREMENT,
        user_ID VARCHAR(30) NOT NULL,
        pet_ID VARCHAR(30) NOT NULL,
        PRIMARY KEY (id))`
).then(() => console.log("Table Created"))
.catch((err) => console.log(err))


const Schemas = require('../schemas/allSchemas');

// router.delete(
//     '/deletePost/:postID',
//     authorization,
//     authorizeDelete,
//     petController.deletePost
// )
// router.get(
//     '/getAllPrivatePosts',
//     authorization,
//     petController.getAllPrivatePosts
// )
// router.get(
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