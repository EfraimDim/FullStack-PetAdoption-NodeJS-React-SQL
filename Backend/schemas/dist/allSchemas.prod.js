"use strict";var Ajv=require("ajv"),ajv=new Ajv;exports.addOrEditPetSchemaAJV={type:"object",properties:{type:{type:"string",maxLength:15},adoptionStatus:{type:"string",maxLength:10},name:{type:"string",maxLength:15},colour:{type:"string",maxLength:30},height:{type:"string",minLength:1,maxLength:3},weight:{type:"string",minLength:1,maxLength:2},bio:{type:"string",maxLength:200},hypoallergenic:{type:"string",minLength:4,maxLength:5},dietryRestrictions:{type:"string",maxLength:100},breed:{type:"string",maxLength:20},petID:{type:"string",maxLength:50},adminEmail:{type:"string",format:"email",maxLength:50}},required:["type","adoptionStatus","name","colour","height","weight","bio","hypoallergenic","dietryRestrictions","breed","adminEmail"],additionalProperties:!1},exports.editPetWithoutPhotoSchemaAJV={type:"object",properties:{type:{type:"string",maxLength:15},adoptionStatus:{type:"string",maxLength:10},name:{type:"string",maxLength:15},colour:{type:"string",maxLength:30},height:{type:"number"},weight:{type:"number"},bio:{type:"string",maxLength:200},hypoallergenic:{type:"boolean"},dietryRestrictions:{type:"string",maxLength:100},breed:{type:"string",maxLength:20},petID:{type:"string",maxLength:50},adminEmail:{type:"string",format:"email",maxLength:50}},required:["type","adoptionStatus","name","colour","height","weight","bio","hypoallergenic","dietryRestrictions","breed","adminEmail"],additionalProperties:!1},exports.petIDSchemaAJV={type:"object",properties:{petID:{type:"string",maxLength:50}},required:["petID"],additionalProperties:!1},exports.fosterAndAdoptionSchemaAJV={type:"object",properties:{petID:{type:"string",maxLength:50},type:{type:"string",maxLength:15},name:{type:"string",maxLength:15},userEmail:{type:"string",format:"email",maxLength:50}},required:["petID","type","name","userEmail"],additionalProperties:!1},exports.signUpSchemaAJV={type:"object",properties:{email:{type:"string",format:"email",maxLength:50},password:{type:"string",minLength:6,maxLength:20},rePassword:{type:"string",minLength:6,maxLength:20},firstName:{type:"string",maxLength:20},lastName:{type:"string",maxLength:20},phoneNumber:{type:"string",minLength:10,maxLength:10},admin:{type:"boolean"},adminCode:{type:"string"}},required:["email","password","rePassword","firstName","lastName","phoneNumber","admin"],additionalProperties:!1},exports.loginSchemaAJV={type:"object",properties:{email:{type:"string",format:"email",maxLength:50},password:{type:"string",minLength:6,maxLength:20}},required:["email","password"],additionalProperties:!1},exports.updateProfileSchemaAJV={type:"object",properties:{email:{type:"string",format:"email",maxLength:50},firstName:{type:"string",maxLength:20},lastName:{type:"string",maxLength:20},phoneNumber:{type:"string",minLength:10,maxLength:10},bio:{type:"string",maxLength:200}},required:["email","firstName","lastName","phoneNumber","bio"],additionalProperties:!1},exports.updatePasswordSchemaAJV={type:"object",properties:{oldPassword:{type:"string",minLength:6,maxLength:20},password:{type:"string",minLength:6,maxLength:20},rePassword:{type:"string",minLength:6,maxLength:20}},required:["oldPassword","password","rePassword"],additionalProperties:!1};