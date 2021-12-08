"use strict";

var _require = require('uuid'),
    uuidv4 = _require.v4;

var _require2 = require('../models/queryModel'),
    query = _require2.query;

exports.login = function (req, res) {
  try {
    var token = req.token;
    res.send({
      token: token,
      userInfo: req.body.user,
      message: "Login Success!"
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: e.message
    });
  }
};

exports.signUpPublicUser = function _callee(req, res) {
  var _req$body, email, password, firstName, lastName, phoneNumber, admin, date, userID;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNumber = _req$body.phoneNumber, admin = _req$body.admin;
          date = new Date().toISOString().slice(0, 19).replace('T', ' ');
          userID = uuidv4();
          _context.next = 6;
          return regeneratorRuntime.awrap(query("INSERT INTO users (user_ID, email, password, first_name, last_name, phone, admin_status, date_created, bio) VALUES ('".concat(userID, "', '").concat(email.toLowerCase(), "', '").concat(password, "', '").concat(firstName, "', '").concat(lastName, "', ").concat(phoneNumber, ", ").concat(admin, ", '").concat(date, "', '')")));

        case 6:
          res.send("Register Succesful!");
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(400).send({
            error: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.updateUserPassword = function _callee2(req, res) {
  var password, userID;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          password = req.body.password;
          userID = req.decoded;
          _context2.next = 5;
          return regeneratorRuntime.awrap(query("UPDATE users SET password = \"".concat(password, "\" WHERE user_ID = \"").concat(userID.userID, "\"")));

        case 5:
          res.send("Updated Password Succesfully!");
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(400).send({
            error: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.updateUserProfile = function _callee3(req, res) {
  var _req$body2, email, firstName, lastName, phoneNumber, bio, userID, updateQuery;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, firstName = _req$body2.firstName, lastName = _req$body2.lastName, phoneNumber = _req$body2.phoneNumber, bio = _req$body2.bio;
          userID = req.decoded;
          _context3.next = 5;
          return regeneratorRuntime.awrap(query("UPDATE users SET email = \"".concat(email, "\", first_name = \"").concat(firstName, "\", last_name = \"").concat(lastName, "\", phone = ").concat(phoneNumber, ", bio = \"").concat(bio, "\" WHERE user_ID = \"").concat(userID.userID, "\"")));

        case 5:
          updateQuery = _context3.sent;
          res.send("Updated Profile Succesfully!");
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(400).send({
            error: _context3.t0.message
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};