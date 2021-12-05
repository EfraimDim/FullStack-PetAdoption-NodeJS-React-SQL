const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const {
    checkPassword,
    checkEmailAndUsernameValid,
    encryptPwd,
    createToken,
    decryptPwd
} = require('../middleware/middleware');

const {query} = require('../models/queryModel')

query(
    `CREATE TABLE IF NOT EXISTS users (
        id INT(200) AUTO_INCREMENT,
        user_ID VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL,
        password VARCHAR(30) NOT NULL,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        phone INT(10) NOT NULL,
        admin_status BOOLEAN NOT NULL,
        date_created DATE DEFAULT (CURRENT_DATE),
        bio VARCHAR(200) NOT NULL,
        PRIMARY KEY (id))`
).then(() => console.log("Table Created"))
.catch((err) => console.log(err))

const Schemas = require('../schemas/allSchemas');

router.post(
    '/login',
    // validateBody(Schemas.loginSchemaAJV),
    decryptPwd,
    createToken,
    usersController.login
)


router.post(
    '/signUp',
    // validateBody(Schemas.registerSchemaAJV),
    checkEmailAndUsernameValid,
    checkPassword,
    encryptPwd,
    usersController.addPublicUser
)



module.exports = router;