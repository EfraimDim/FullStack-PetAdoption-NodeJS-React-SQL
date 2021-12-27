"use strict";

var userQueries = require('../queries/userQueries');

var _require = require('uuid'),
    uuidv4 = _require.v4;

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
  var _req$body, email, password, firstName, lastName, phoneNumber, admin, userID;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNumber = _req$body.phoneNumber, admin = _req$body.admin;
          userID = uuidv4();
          _context.next = 5;
          return regeneratorRuntime.awrap(userQueries.signUpUserQuery(email, password, firstName, lastName, phoneNumber, admin, userID));

        case 5:
          res.send("Register Succesful!");
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send(_context.t0.message);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
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
          return regeneratorRuntime.awrap(userQueries.updateUserPasswordQuery(password, userID));

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
          return regeneratorRuntime.awrap(userQueries.updateUserProfileQuery(email, firstName, lastName, phoneNumber, bio, userID));

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
  var adminArrays;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(userQueries.adminUserNewsfeedArraysQuery());

        case 3:
          adminArrays = _context4.sent;
          res.send({
            usersArray: adminArrays.usersArray,
            newsfeedArray: adminArrays.newsfeedArray,
            enquiryArray: adminArrays.enquiryArray
          });
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).send(_context4.t0.message);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
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
          return regeneratorRuntime.awrap(userQueries.getViewedUsersPetsQuery(viewedUserID));

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
  var _req$body3, email, firstName, lastName, phone, enquiry, userID, enquiryID, dateCreated;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body3 = req.body, email = _req$body3.email, firstName = _req$body3.firstName, lastName = _req$body3.lastName, phone = _req$body3.phone, enquiry = _req$body3.enquiry;
          userID = req.decoded.userID;
          enquiryID = uuidv4();
          dateCreated = new Date().toJSON().slice(0, 19).replace('T', ' ');
          _context6.next = 7;
          return regeneratorRuntime.awrap(userQueries.sendEnquiryQuery(email, firstName, lastName, phone, enquiry, userID, enquiryID, dateCreated));

        case 7:
          res.send("Enquiry Sent Succesful!");
          _context6.next = 14;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).send(_context6.t0.message);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.enquiryToInProgress = function _callee7(req, res) {
  var _req$body4, enquiryID, adminEmail, userEmail, userID, updateEnquiryQuery;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body4 = req.body, enquiryID = _req$body4.enquiryID, adminEmail = _req$body4.adminEmail, userEmail = _req$body4.userEmail;
          userID = req.decoded.userID;
          _context7.next = 5;
          return regeneratorRuntime.awrap(userQueries.enquiryToInProgressQuery(enquiryID, adminEmail, userEmail, userID));

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
  var _req$body5, enquiryID, adminEmail, userEmail, userID, updateEnquiryQuery;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body5 = req.body, enquiryID = _req$body5.enquiryID, adminEmail = _req$body5.adminEmail, userEmail = _req$body5.userEmail;
          userID = req.decoded.userID;
          _context8.next = 5;
          return regeneratorRuntime.awrap(userQueries.enquiryToResolvedQuery(enquiryID, adminEmail, userEmail, userID));

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
          return regeneratorRuntime.awrap(userQueries.enquiryToDeleteQuery(enquiryID));

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

exports.enquirySearch = function _callee10(req, res) {
  var _req$query, email, date, searchResults;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$query = req.query, email = _req$query.email, date = _req$query.date;
          _context10.next = 4;
          return regeneratorRuntime.awrap(userQueries.enquirySearchQuery(email, date));

        case 4:
          searchResults = _context10.sent;
          res.send(searchResults);
          _context10.next = 12;
          break;

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          res.status(500).send(_context10.t0.message);

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.makeAdmin = function _callee11(req, res) {
  var _req$body6, adminEmail, publicUserEmail, publicUserID, updateToAdminQuery;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body6 = req.body, adminEmail = _req$body6.adminEmail, publicUserEmail = _req$body6.publicUserEmail, publicUserID = _req$body6.publicUserID;
          _context11.next = 4;
          return regeneratorRuntime.awrap(userQueries.makeAdminQuery(adminEmail, publicUserEmail, publicUserID));

        case 4:
          updateToAdminQuery = _context11.sent;
          res.send("Updated Admin Succesfully!");
          _context11.next = 12;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          res.status(500).send(_context11.t0.message);

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.lastSeenPets = function _callee12(req, res) {
  var allPetArrayIDsString, userID, updateEnquiryQuery;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          allPetArrayIDsString = req.body.allPetArrayIDsString;
          userID = req.decoded.userID;
          _context12.next = 5;
          return regeneratorRuntime.awrap(userQueries.lastSeenPetsQuery(allPetArrayIDsString, userID));

        case 5:
          updateEnquiryQuery = _context12.sent;
          res.send("Updated Succesfully!");
          _context12.next = 13;
          break;

        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          res.status(500).send(_context12.t0.message);

        case 13:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 9]]);
};