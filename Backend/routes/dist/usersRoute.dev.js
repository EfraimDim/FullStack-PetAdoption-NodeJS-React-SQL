"use strict";

var express = require('express');

var router = express.Router();

var usersController = require('../controllers/usersController');

var _require = require('../middleware/middleware'),
    checkPassword = _require.checkPassword,
    checkEmailAndUsernameValid = _require.checkEmailAndUsernameValid,
    encryptPwd = _require.encryptPwd,
    createToken = _require.createToken,
    decryptPwd = _require.decryptPwd;

var _require2 = require('../models/queryModel'),
    query = _require2.query;

query("CREATE TABLE IF NOT EXISTS users (\n        id INT(200) AUTO_INCREMENT,\n        user_ID VARCHAR(30) NOT NULL,\n        email VARCHAR(30) NOT NULL,\n        password VARCHAR(30) NOT NULL,\n        first_name VARCHAR(30) NOT NULL,\n        last_name VARCHAR(30) NOT NULL,\n        phone INT(10) NOT NULL,\n        admin_status BOOLEAN NOT NULL,\n        date_created DATE DEFAULT (CURRENT_DATE),\n        bio VARCHAR(200) NOT NULL,\n        PRIMARY KEY (id))").then(function () {
  return console.log("Table Created");
})["catch"](function (err) {
  return console.log(err);
});

var Schemas = require('../schemas/allSchemas');

router.post('/login', // validateBody(Schemas.loginSchemaAJV),
decryptPwd, createToken, usersController.login);
router.post('/signUp', // validateBody(Schemas.registerSchemaAJV),
checkEmailAndUsernameValid, checkPassword, encryptPwd, usersController.addPublicUser);
module.exports = router;