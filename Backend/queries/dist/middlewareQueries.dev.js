"use strict";

var _require = require('../lib/mysql'),
    query = _require.query;

exports.emailValidationQuery = function _callee(email) {
  var emailValidation;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(query("SELECT * FROM users WHERE email = '".concat(email.toLowerCase(), "'")));

        case 3:
          emailValidation = _context.sent;
          return _context.abrupt("return", emailValidation);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.userIDValidationQuery = function _callee2(userID) {
  var userIDValidation;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(query("SELECT * FROM users WHERE user_ID = '".concat(userID, "'")));

        case 3:
          userIDValidation = _context2.sent;
          return _context2.abrupt("return", userIDValidation);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.availabilityCheckQuery = function _callee3(petID) {
  var availabilityCheck;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(query("SELECT availability FROM pets WHERE pet_ID = '".concat(petID, "'")));

        case 3:
          availabilityCheck = _context3.sent;
          return _context3.abrupt("return", availabilityCheck);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};