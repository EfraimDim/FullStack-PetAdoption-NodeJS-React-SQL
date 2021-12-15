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
    '/usersAndNewsfeedArraysForAdmin',
    authorization,
    checkAdminForAllReq,
    usersController.adminUserNewsfeedArrays
)

router.get(
    '/viewedUsersPets',
    authorization,
    checkAdminForAllReq,
    usersController.getViewedUsersPets
)



module.exports = router;