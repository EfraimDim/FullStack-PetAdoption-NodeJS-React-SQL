"use strict";

var Ajv = require('ajv');

var ajv = new Ajv();

var addFormats = require('ajv-formats');

addFormats(ajv);

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var dotenv = require('dotenv').config();

var _require = require('../models/queryModel'),
    query = _require.query;

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

exports.checkEmailValidSignUp = function _callee(req, res, next) {
  var email, emailValidation;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = req.body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap(query("SELECT * FROM users WHERE email = '".concat(email.toLowerCase(), "'")));

        case 4:
          emailValidation = _context.sent;
          emailValidation.push('not found');

          if (emailValidation[0] === 'not found') {
            next();
          } else {
            res.status(400).send('email already taken');
          }

          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.checkPasswordsMatch = function (req, res, next) {
  try {
    var _req$body = req.body,
        password = _req$body.password,
        rePassword = _req$body.rePassword;

    if (password === rePassword) {
      next();
    } else {
      res.status(400).send("passwords don't match!");
    }
  } catch (e) {
    console.error(e);
  }
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

exports.decryptPwd = function _callee2(req, res, next) {
  var _req$body2, email, password, emailValidation;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(query("SELECT * FROM users WHERE email = '".concat(email.toLowerCase(), "'")));

        case 4:
          emailValidation = _context2.sent;
          emailValidation.push('not found');

          if (emailValidation[0] === 'not found') {
            res.status(400).send("email not found!");
          } else {
            bcrypt.compare(password, emailValidation[0].password, function (err, result) {
              if (err) {
                throw new Error('Incorrect password');
              }

              if (result) {
                req.body.user = emailValidation[0];
                next();
              }
            });
          }

          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.createToken = function (req, res, next) {
  try {
    var user = req.body.user;
    var token = jwt.sign({
      userID: user.user_ID
    }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });
    req.token = token;
    next();
  } catch (e) {
    console.error(e);
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

exports.checkOldPasswordCorrect = function _callee3(req, res, next) {
  var oldPassword, userID, userIDValidation;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          oldPassword = req.body.oldPassword;
          userID = req.decoded;
          _context3.next = 5;
          return regeneratorRuntime.awrap(query("SELECT * FROM users WHERE user_ID = '".concat(userID.userID, "'")));

        case 5:
          userIDValidation = _context3.sent;
          userIDValidation.push('not found');

          if (userIDValidation[0] === 'not found') {
            res.status(400).send("user not found!");
          } else {
            bcrypt.compare(oldPassword, userIDValidation[0].password, function (err, result) {
              if (err) {
                throw new Error('Incorrect password');
              }

              if (result) {
                next();
              }
            });
          }

          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.checkEmailValidProfileUpdate = function _callee4(req, res, next) {
  var email, userID, userIDValidation, emailValidation;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          email = req.body.email;
          userID = req.decoded;
          _context4.next = 5;
          return regeneratorRuntime.awrap(query("SELECT * FROM users WHERE user_ID = '".concat(userID.userID, "'")));

        case 5:
          userIDValidation = _context4.sent;

          if (!(userIDValidation[0].email === email)) {
            _context4.next = 10;
            break;
          }

          next();
          _context4.next = 15;
          break;

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(query("SELECT * FROM users WHERE email = '".concat(email.toLowerCase(), "'")));

        case 12:
          emailValidation = _context4.sent;
          emailValidation.push('not found');

          if (emailValidation[0] === 'not found') {
            next();
          } else {
            res.status(400).send('email already taken');
          }

        case 15:
          _context4.next = 20;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
};