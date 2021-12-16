"use strict";

function _templateObject11() {
  var data = _taggedTemplateLiteral(["DELETE FROM enquiry WHERE enquiry_ID = ", ""]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["UPDATE enquiry SET admin_ID = ", ", admin_Email = ", ", status = \"resolved\" WHERE enquiry_ID = ", ""]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["UPDATE enquiry SET admin_ID = ", ", admin_Email = ", ", status = \"in progress\" WHERE enquiry_ID = ", ""]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["INSERT INTO enquiry (user_ID, enquiry_ID, user_Email, first_name, last_name, phone, enquiry) VALUES (", ", ", ", ", ", ", ", ", ", ", ", ", ")"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["SELECT * FROM pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID WHERE user_ID = ", ""]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["SELECT * FROM enquiry"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["SELECT * FROM newsfeed"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["SELECT user_ID, email, first_name, last_name, phone, bio, date_created, admin_status FROM users"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["UPDATE users SET email = ", ", first_name = ", ", last_name = ", ", phone = ", ", bio = ", " WHERE user_ID = ", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["UPDATE users SET password = ", " WHERE user_ID = ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["INSERT INTO users (user_ID, email, password, first_name, last_name, phone, admin_status, bio) VALUES (", ", ", ", ", ", ", ", ", ", ", ", ", ", '')"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SQL = require('@nearform/sql');

var _require = require('uuid'),
    uuidv4 = _require.v4;

var _require2 = require('../lib/mysql'),
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
    res.status(500).send(e.message);
  }
};

exports.signUpUser = function _callee(req, res) {
  var _req$body, email, password, firstName, lastName, phoneNumber, admin, userID, updateNewsFeedAdminUser, updateNewsFeedPublicUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNumber = _req$body.phoneNumber, admin = _req$body.admin;
          userID = uuidv4();
          _context.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject(), userID, email.toLowerCase(), password, firstName, lastName, phoneNumber, admin)));

        case 5:
          if (!(admin === true)) {
            _context.next = 11;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"New Admin User! Email: ".concat(email, " Name: ").concat(firstName, " ").concat(lastName, "!\")")));

        case 8:
          updateNewsFeedAdminUser = _context.sent;
          _context.next = 14;
          break;

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"New Public User! Email: ".concat(email, " Name: ").concat(firstName, " ").concat(lastName, "!\")")));

        case 13:
          updateNewsFeedPublicUser = _context.sent;

        case 14:
          res.send("Register Succesful!");
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send(_context.t0.message);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.updateUserPassword = function _callee2(req, res) {
  var password, userID;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          password = req.body.password;
          userID = req.decoded.userID;
          _context2.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject2(), password, userID)));

        case 5:
          res.send("Updated Password Succesfully!");
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send(_context2.t0.message);

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
          userID = req.decoded.userID;
          _context3.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject3(), email, firstName, lastName, phoneNumber, bio, userID)));

        case 5:
          updateQuery = _context3.sent;
          res.send("Updated Profile Succesfully!");
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).send(_context3.t0.message);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.adminUserNewsfeedArrays = function _callee4(req, res) {
  var usersArray, newsfeedArray, enquiryArray;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject4())));

        case 3:
          usersArray = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(query(SQL(_templateObject5())));

        case 6:
          newsfeedArray = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(query(SQL(_templateObject6())));

        case 9:
          enquiryArray = _context4.sent;
          res.send({
            usersArray: usersArray,
            newsfeedArray: newsfeedArray,
            enquiryArray: enquiryArray
          });
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).send(_context4.t0.message);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.getViewedUsersPets = function _callee5(req, res) {
  var viewedUserID, viewedUsersPets;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          viewedUserID = req.query.viewedUserID;
          _context5.next = 4;
          return regeneratorRuntime.awrap(query(SQL(_templateObject7(), viewedUserID)));

        case 4:
          viewedUsersPets = _context5.sent;
          res.send(viewedUsersPets);
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).send(_context5.t0.message);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.sendEnquiry = function _callee6(req, res) {
  var _req$body3, email, firstName, lastName, phone, enquiry, userID, enquiryID, sendEnquiry, updateNewsFeedAdminUser;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body3 = req.body, email = _req$body3.email, firstName = _req$body3.firstName, lastName = _req$body3.lastName, phone = _req$body3.phone, enquiry = _req$body3.enquiry;
          userID = req.decoded.userID;
          enquiryID = uuidv4();
          _context6.next = 6;
          return regeneratorRuntime.awrap(query(SQL(_templateObject8(), userID, enquiryID, email, firstName, lastName, phone, enquiry)));

        case 6:
          sendEnquiry = _context6.sent;
          _context6.next = 9;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"New Enquiry! Email: ".concat(email, " Name: ").concat(firstName, " ").concat(lastName, " has sent an enquiry!\")")));

        case 9:
          updateNewsFeedAdminUser = _context6.sent;
          res.send("Enquiry Sent Succesful!");
          _context6.next = 17;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).send(_context6.t0.message);

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.enquiryToInProgress = function _callee7(req, res) {
  var _req$body4, enquiryID, adminEmail, userID, updateEnquiryQuery;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body4 = req.body, enquiryID = _req$body4.enquiryID, adminEmail = _req$body4.adminEmail;
          userID = req.decoded.userID;
          _context7.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject9(), userID, adminEmail, enquiryID)));

        case 5:
          updateEnquiryQuery = _context7.sent;
          res.send("Updated Enquiry Succesfully!");
          _context7.next = 13;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.status(500).send(_context7.t0.message);

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.enquiryToResolved = function _callee8(req, res) {
  var _req$body5, enquiryID, adminEmail, userID, updateEnquiryQuery;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body5 = req.body, enquiryID = _req$body5.enquiryID, adminEmail = _req$body5.adminEmail;
          userID = req.decoded.userID;
          _context8.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject10(), userID, adminEmail, enquiryID)));

        case 5:
          updateEnquiryQuery = _context8.sent;
          res.send("Updated Enquiry Succesfully!");
          _context8.next = 13;
          break;

        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          res.status(500).send(_context8.t0.message);

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.enquiryToDelete = function _callee9(req, res) {
  var enquiryID, deleteEnquiryQuery;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          enquiryID = req.params.enquiryID;
          _context9.next = 4;
          return regeneratorRuntime.awrap(query(SQL(_templateObject11(), enquiryID)));

        case 4:
          deleteEnquiryQuery = _context9.sent;
          res.send("Deleted Enquiry Succesfully!");
          _context9.next = 12;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          res.status(500).send(_context9.t0.message);

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 8]]);
};