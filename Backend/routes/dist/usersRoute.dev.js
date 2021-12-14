"use strict";

var express = require('express');

var router = express.Router();

var usersController = require('../controllers/usersController');

var _require = require('../middleware/middleware'),
    authorization = _require.authorization,
    validateBody = _require.validateBody,
    checkPasswordsMatch = _require.checkPasswordsMatch,
    checkEmailValidSignUp = _require.checkEmailValidSignUp,
    encryptPwd = _require.encryptPwd,
    createToken = _require.createToken,
    decryptPwd = _require.decryptPwd,
    checkOldPasswordCorrect = _require.checkOldPasswordCorrect,
    checkEmailValidProfileUpdate = _require.checkEmailValidProfileUpdate,
    checkAdminAccountCreated = _require.checkAdminAccountCreated,
    checkAdminForAllReq = _require.checkAdminForAllReq;

var Schemas = require('../schemas/allSchemas');

router.post('/login', validateBody(Schemas.loginSchemaAJV), decryptPwd, createToken, usersController.login);
router.post('/signUp', validateBody(Schemas.signUpSchemaAJV), checkEmailValidSignUp, checkPasswordsMatch, encryptPwd, checkAdminAccountCreated, usersController.signUpUser);
router.put('/updateProfile', validateBody(Schemas.updateProfileSchemaAJV), authorization, checkEmailValidProfileUpdate, usersController.updateUserProfile);
router.put('/updatePassword', validateBody(Schemas.updatePasswordSchemaAJV), authorization, checkPasswordsMatch, encryptPwd, checkOldPasswordCorrect, usersController.updateUserPassword);
router.get('/allPublicUsers', authorization, checkAdminForAllReq, usersController.getAllPublicUsers);
router.get('/allAdminUsers', authorization, checkAdminForAllReq, usersController.getAllAdminUsers);
router.get('/viewedUsersPets', authorization, checkAdminForAllReq, usersController.getViewedUsersPets);
module.exports = router;