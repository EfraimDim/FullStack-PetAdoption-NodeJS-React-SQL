const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require('ajv-formats');
addFormats(ajv);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const {query} = require('../models/queryModel')




exports.validateBody = (schema) => {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0]['message']);
      return;
    }
    next();
  };
};

exports.checkEmailValidSignUp = async(req, res, next) => {
  try {

    const { email } = req.body;
    const emailValidation = await query(`SELECT * FROM users WHERE email = '${email.toLowerCase()}'`)
    emailValidation.push('not found')
    if (emailValidation[0] === 'not found') {
      next()
    } else {
      res.status(400).send('email already taken');
    }
  } catch (e) {
    console.error(e);
  }
};

exports.checkPasswordsMatch = (req, res, next) => {  
  try {
    const { password, rePassword } = req.body;
    if (password === rePassword) {
      next();
    } else {
      res.status(400).send("passwords don't match!");
    }
  } catch (e) {
    console.error(e);
  }
};


exports.encryptPwd = (req, res, next) => {
  try{
  const { password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send('Error Encrypting');
      return;
    }
    req.body.password = hash;
    next();
  });
}catch (e) {
  console.error(e)
}
};

exports.decryptPwd = async(req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailValidation = await query(`SELECT * FROM users WHERE email = '${email.toLowerCase()}'`)
    emailValidation.push('not found')
    if(emailValidation[0] === 'not found'){
      res.status(400).send("email not found!");
    }else{
    bcrypt.compare(password, emailValidation[0].password, (err, result) => {
      if (err) {
        throw new Error('Incorrect password');
      }
      if (result) {
        req.body.user = emailValidation[0]
        next();
      }
    });
  }} catch (err) {
    res.status(400).send(err);
  }
};

exports.createToken = (req, res, next) => {
  try {
    const {user} = req.body
    const token = jwt.sign({ userID: user.user_ID }, process.env.SECRET_KEY, { expiresIn: '1h' });
    req.token = token;
    next();
    
  } catch (e) {
    console.error(e);
  }
};


exports.authorization = (req, res, next) => {
  try{
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    res.status(401).send('Must provide a token');
    return;
  }
  const token = authHeaders.replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send('Invalid Token');
      return;
    }
    req.decoded = decoded;
    next();
  });
}catch (e) {
  console.error(e)
}
};

exports.checkOldPasswordCorrect = async(req, res, next) => {
  try {
    const { oldPassword } = req.body;
    const userID = req.decoded
    const userIDValidation = await query(`SELECT * FROM users WHERE user_ID = '${userID.userID}'`)
    userIDValidation.push('not found')
    if(userIDValidation[0] === 'not found'){
      res.status(400).send("user not found!");
    }else{
    bcrypt.compare(oldPassword, userIDValidation[0].password, (err, result) => {
      if (err) {
        throw new Error('Incorrect password');
      }
      if (result) {
        next();
      }
    });
  }} catch (err) {
    res.status(400).send(err);
  }
};

exports.checkEmailValidProfileUpdate = async(req, res, next) => {
  try {
    const { email } = req.body;
    const userID = req.decoded
    const userIDValidation = await query(`SELECT * FROM users WHERE user_ID = '${userID.userID}'`)
    if(userIDValidation[0].email === email){
      next()
    }else{
    const emailValidation = await query(`SELECT * FROM users WHERE email = '${email.toLowerCase()}'`)
    emailValidation.push('not found')
    if (emailValidation[0] === 'not found') {
      next()
    } else {
      res.status(400).send('email already taken');
    }
  } }catch (e) {
    console.error(e);
  }
};



















