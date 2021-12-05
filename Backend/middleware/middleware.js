const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require('ajv-formats');
addFormats(ajv);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();




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

exports.decryptPwd = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = users.users.find((user) => user.email === email);
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        throw new Error('Incorrect password');
      }
      if (result) {
        next();
      }
    });
  } catch (err) {
    res.status(400).send(err);
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


exports.authorizeEdit = (req, res, next) => {
  try{
    const {userID} = req.decoded
    const {postID} = req.body
    const user = users.findUser(userID)
    const post = allPosts.findPost(postID)
    if(user.username === post.poster){
    next();}
    else{
      res.status(400).send('You are not authroized to do that!');
    }
  }
catch (e) {
  console.error(e)
}}


exports.authorizeDelete = (req, res, next) => {
  try{
    const {userID} = req.decoded
    const { postID } = req.params
    const user = users.findUser(userID)
    const post = allPosts.findPost(postID)
    if(user.username === post.poster){
    next();}
    else{
      res.status(400).send('You are not authroized to do that!');
    }
  }
catch (e) {
  console.error(e)
}}
;


exports.createToken = (req, res, next) => {
  try {
    const user = users.users.find((user) => req.body.email === user.email);
    const token = jwt.sign({ userID: user.userID }, process.env.SECRET_KEY, { expiresIn: '1h' });
    req.token = token;
    next();
    
  } catch (e) {
    console.error(e);
  }
};
exports.checkPassword = (req, res, next) => {  
  try {
    const { password, repassword } = req.body;
    if (password === repassword) {
      next();
    } else {
      res.status(400).send("passwords don't match!");
    }
  } catch (e) {
    console.error(e);
  }
};

exports.checkEmailAndUsernameValid = (req, res, next) => {
  try {
    const { email, username } = req.body;
    const emailValidation = users.users.find(user => user.email === email);
    const usernameValidation = users.users.find(user => user.username === username);
    if (emailValidation || usernameValidation) {
      res.status(400).send('email already taken');
    } else {
      next();
    }
  } catch (e) {
    console.error(e);
  }
};








