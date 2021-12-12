const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const {
    authorization,
    validateBody,
    checkPasswordsMatch,
    checkEmailValidSignUp,
    encryptPwd,
    createToken,
    decryptPwd,
    checkOldPasswordCorrect,
    checkEmailValidProfileUpdate,
    checkAdminAccountCreated,
    checkAdminForAllReq
} = require('../middleware/middleware');

const {query} = require('../models/queryModel')


 
query(
    `CREATE TABLE IF NOT EXISTS users (
        id INT(200) AUTO_INCREMENT,
        user_ID VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
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
    validateBody(Schemas.loginSchemaAJV),
    decryptPwd,
    createToken,
    usersController.login
)

router.post(
    '/signUp',
    validateBody(Schemas.signUpSchemaAJV),
    checkEmailValidSignUp,
    checkPasswordsMatch,
    encryptPwd,
    checkAdminAccountCreated,
    usersController.signUpUser
)


router.put(
    '/updateProfile',
    validateBody(Schemas.updateProfileSchemaAJV),
    authorization,
    checkEmailValidProfileUpdate,
    usersController.updateUserProfile
)

router.put(
    '/updatePassword',
    validateBody(Schemas.updatePasswordSchemaAJV),
    authorization,
    checkPasswordsMatch,
    encryptPwd,
    checkOldPasswordCorrect,
    usersController.updateUserPassword
)

router.get(
    '/allPublicUsers',
    authorization,
    checkAdminForAllReq,
    usersController.getAllPublicUsers
)

router.get(
    '/allAdminUsers',
    authorization,
    checkAdminForAllReq,
    usersController.getAllAdminUsers
)
router.get(
    '/viewedUsersPets',
    authorization,
    checkAdminForAllReq,
    usersController.getViewedUsersPets
)



module.exports = router;