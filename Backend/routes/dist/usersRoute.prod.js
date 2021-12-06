"use strict";var express=require("express"),router=express.Router(),usersController=require("../controllers/usersController"),_require=require("../middleware/middleware"),authorization=_require.authorization,checkPasswordsMatch=_require.checkPasswordsMatch,checkEmailValidSignUp=_require.checkEmailValidSignUp,encryptPwd=_require.encryptPwd,createToken=_require.createToken,decryptPwd=_require.decryptPwd,checkOldPasswordCorrect=_require.checkOldPasswordCorrect,checkEmailValidProfileUpdate=_require.checkEmailValidProfileUpdate,_require2=require("../models/queryModel"),query=_require2.query;query("CREATE TABLE IF NOT EXISTS users (\n        id INT(200) AUTO_INCREMENT,\n        user_ID VARCHAR(50) NOT NULL,\n        email VARCHAR(30) NOT NULL,\n        password VARCHAR(100) NOT NULL,\n        first_name VARCHAR(30) NOT NULL,\n        last_name VARCHAR(30) NOT NULL,\n        phone INT(10) NOT NULL,\n        admin_status BOOLEAN NOT NULL,\n        date_created DATE DEFAULT (CURRENT_DATE),\n        bio VARCHAR(200) NOT NULL,\n        PRIMARY KEY (id))").then(function(){return console.log("Table Created")}).catch(function(e){return console.log(e)});var Schemas=require("../schemas/allSchemas");router.post("/login",decryptPwd,createToken,usersController.login),router.post("/signUp",checkEmailValidSignUp,checkPasswordsMatch,encryptPwd,usersController.signUpPublicUser),router.put("/updateProfile",authorization,checkEmailValidProfileUpdate,usersController.updateUserProfile),router.put("/updatePassword",authorization,checkPasswordsMatch,encryptPwd,checkOldPasswordCorrect,usersController.updateUserPassword),module.exports=router;