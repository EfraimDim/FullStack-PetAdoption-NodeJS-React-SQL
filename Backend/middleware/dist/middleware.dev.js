"use strict";

var Ajv = require('ajv');

var ajv = new Ajv();

var addFormats = require('ajv-formats');

addFormats(ajv);

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var dotenv = require('dotenv').config();

exports.validateBody = function (schema) {
  return function (req, res, next) {
    var valid = ajv.validate(schema, req.body);

    if (!valid) {
      res.status(400).send(ajv.errors[0]['message']);
      return;
    }

    next();
  };
};

exports.encryptPwd = function (req, res, next) {
  try {
    var password = req.body.password;
    var saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        res.status(500).send('Error Encrypting');
        return;
      }

      req.body.password = hash;
      next();
    });
  } catch (e) {
    console.error(e);
  }
};

exports.decryptPwd = function (req, res, next) {
  try {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;
    var user = users.users.find(function (user) {
      return user.email === email;
    });
    bcrypt.compare(password, user.password, function (err, result) {
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

exports.authorization = function (req, res, next) {
  try {
    var authHeaders = req.headers['authorization'];

    if (!authHeaders) {
      res.status(401).send('Must provide a token');
      return;
    }

    var token = authHeaders.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send('Invalid Token');
        return;
      }

      req.decoded = decoded;
      next();
    });
  } catch (e) {
    console.error(e);
  }
};

exports.authorizeEdit = function (req, res, next) {
  try {
    var userID = req.decoded.userID;
    var postID = req.body.postID;
    var user = users.findUser(userID);
    var post = allPosts.findPost(postID);

    if (user.username === post.poster) {
      next();
    } else {
      res.status(400).send('You are not authroized to do that!');
    }
  } catch (e) {
    console.error(e);
  }
};

exports.authorizeDelete = function (req, res, next) {
  try {
    var userID = req.decoded.userID;
    var postID = req.params.postID;
    var user = users.findUser(userID);
    var post = allPosts.findPost(postID);

    if (user.username === post.poster) {
      next();
    } else {
      res.status(400).send('You are not authroized to do that!');
    }
  } catch (e) {
    console.error(e);
  }
};

exports.createToken = function (req, res, next) {
  try {
    var user = users.users.find(function (user) {
      return req.body.email === user.email;
    });
    var token = jwt.sign({
      userID: user.userID
    }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });
    req.token = token;
    next();
  } catch (e) {
    console.error(e);
  }
};

exports.checkPassword = function (req, res, next) {
  try {
    var _req$body2 = req.body,
        password = _req$body2.password,
        repassword = _req$body2.repassword;

    if (password === repassword) {
      next();
    } else {
      res.status(400).send("passwords don't match!");
    }
  } catch (e) {
    console.error(e);
  }
};

exports.checkEmailAndUsernameValid = function (req, res, next) {
  try {
    var _req$body3 = req.body,
        email = _req$body3.email,
        username = _req$body3.username;
    var emailValidation = users.users.find(function (user) {
      return user.email === email;
    });
    var usernameValidation = users.users.find(function (user) {
      return user.username === username;
    });

    if (emailValidation || usernameValidation) {
      res.status(400).send('email already taken');
    } else {
      next();
    }
  } catch (e) {
    console.error(e);
  }
};