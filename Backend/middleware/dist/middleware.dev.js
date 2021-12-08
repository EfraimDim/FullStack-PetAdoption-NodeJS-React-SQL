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

          if (emailValidation.length === 0) {
            next();
          } else {
            res.status(400).send('email already taken');
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
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

          if (emailValidation.length === 0) {
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

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
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

          if (userIDValidation.length === 0) {
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

          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
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
          _context4.next = 14;
          break;

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(query("SELECT * FROM users WHERE email = '".concat(email.toLowerCase(), "'")));

        case 12:
          emailValidation = _context4.sent;

          if (emailValidation.length === 0) {
            next();
          } else {
            res.status(400).send('email already taken');
          }

        case 14:
          _context4.next = 19;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.checkIfStillAvailable = function _callee5(req, res, next) {
  var petID, availabilityCheck;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          petID = req.body.petID;
          _context5.next = 4;
          return regeneratorRuntime.awrap(query("SELECT availability FROM pets WHERE pet_ID = '".concat(petID, "'")));

        case 4:
          availabilityCheck = _context5.sent;

          if (availabilityCheck[0].availability === 1) {
            next();
          } else {
            res.send("Sorry this pet is no longer available");
          }

          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};