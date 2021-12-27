"use strict";

function _templateObject16() {
  var data = _taggedTemplateLiteral(["UPDATE users SET last_seen_pet_IDs = ", " WHERE user_ID = ", ""]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["DELETE FROM adoptedPets WHERE user_ID = ", ""]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["DELETE FROM savedPets WHERE user_ID = ", ""]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["UPDATE pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID SET adoption_status = \"available\", availability = true WHERE user_ID = ", " "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["UPDATE users SET admin_status = TRUE  WHERE user_ID = ", ""]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

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
  var data = _taggedTemplateLiteral(["INSERT INTO enquiry (user_ID, enquiry_ID, user_Email, first_name, last_name, phone, enquiry, date_created) VALUES (", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ")"]);

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

var _require = require('../lib/mysql'),
    query = _require.query;

exports.signUpUserQuery = function _callee(email, password, firstName, lastName, phoneNumber, admin, userID) {
  var signUpUser, updateNewsFeedAdminUser, updateNewsFeedPublicUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject(), userID, email.toLowerCase(), password, firstName, lastName, phoneNumber, admin)));

        case 3:
          signUpUser = _context.sent;

          if (!(admin === true)) {
            _context.next = 10;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"New Admin User! Email: ".concat(email, " Name: ").concat(firstName, " ").concat(lastName, "!\")")));

        case 7:
          updateNewsFeedAdminUser = _context.sent;
          _context.next = 13;
          break;

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"New Public User! Email: ".concat(email, " Name: ").concat(firstName, " ").concat(lastName, "!\")")));

        case 12:
          updateNewsFeedPublicUser = _context.sent;

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send(_context.t0.message);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.updateUserPasswordQuery = function _callee2(password, userID) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject2(), password, userID)));

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send(_context2.t0.message);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

exports.updateUserProfileQuery = function _callee3(email, firstName, lastName, phoneNumber, bio, userID) {
  var updateQuery;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject3(), email, firstName, lastName, phoneNumber, bio, userID)));

        case 3:
          updateQuery = _context3.sent;
          _context3.next = 10;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).send(_context3.t0.message);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.adminUserNewsfeedArraysQuery = function _callee4() {
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
          return _context4.abrupt("return", {
            usersArray: usersArray,
            newsfeedArray: newsfeedArray,
            enquiryArray: enquiryArray
          });

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

exports.getViewedUsersPetsQuery = function _callee5(viewedUserID) {
  var viewedUsersPets;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject7(), viewedUserID)));

        case 3:
          viewedUsersPets = _context5.sent;
          return _context5.abrupt("return", viewedUsersPets);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).send(_context5.t0.message);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.sendEnquiryQuery = function _callee6(email, firstName, lastName, phone, enquiry, userID, enquiryID, dateCreated) {
  var sendEnquiry, updateNewsFeedAdminUser;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject8(), userID, enquiryID, email, firstName, lastName, phone, enquiry, dateCreated)));

        case 3:
          sendEnquiry = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"New Enquiry! Email: ".concat(email, " Name: ").concat(firstName, " ").concat(lastName, " has sent an enquiry!\")")));

        case 6:
          updateNewsFeedAdminUser = _context6.sent;
          _context6.next = 13;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).send(_context6.t0.message);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.enquiryToInProgressQuery = function _callee7(enquiryID, adminEmail, userEmail, userID) {
  var updateEnquiryQuery, updateNewsFeed;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject9(), userID, adminEmail, enquiryID)));

        case 3:
          updateEnquiryQuery = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"Enquiry Status Change! Admin: ".concat(adminEmail, " now resolving ").concat(userEmail, " enquiry\")")));

        case 6:
          updateNewsFeed = _context7.sent;
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

exports.enquiryToResolvedQuery = function _callee8(enquiryID, adminEmail, userEmail, userID) {
  var updateEnquiryQuery, updateNewsFeed;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject10(), userID, adminEmail, enquiryID)));

        case 3:
          updateEnquiryQuery = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"Enquiry Status Change! Admin: ".concat(adminEmail, " has resolved ").concat(userEmail, " enquiry!\")")));

        case 6:
          updateNewsFeed = _context8.sent;
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

exports.enquiryToDeleteQuery = function _callee9(enquiryID) {
  var deleteEnquiryQuery;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject11(), enquiryID)));

        case 3:
          deleteEnquiryQuery = _context9.sent;
          _context9.next = 10;
          break;

        case 6:
          _context9.prev = 6;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          res.status(500).send(_context9.t0.message);

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.enquirySearchQuery = function _callee10(email, date) {
  var searchResults;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(query("SELECT * FROM enquiry WHERE user_Email LIKE '%".concat(email, "%' AND date_created LIKE '%").concat(date, "%'")));

        case 3:
          searchResults = _context10.sent;
          return _context10.abrupt("return", searchResults);

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          res.status(500).send(_context10.t0.message);

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.makeAdminQuery = function _callee11(adminEmail, publicUserEmail, publicUserID) {
  var updateToAdminQuery, updateNewAdminsPets, deleteSavedPets, deleteAdoptedPets, updateNewsFeed;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject12(), publicUserID)));

        case 3:
          updateToAdminQuery = _context11.sent;
          _context11.next = 6;
          return regeneratorRuntime.awrap(query(SQL(_templateObject13(), publicUserID)));

        case 6:
          updateNewAdminsPets = _context11.sent;
          _context11.next = 9;
          return regeneratorRuntime.awrap(query(SQL(_templateObject14(), publicUserID)));

        case 9:
          deleteSavedPets = _context11.sent;
          _context11.next = 12;
          return regeneratorRuntime.awrap(query(SQL(_templateObject15(), publicUserID)));

        case 12:
          deleteAdoptedPets = _context11.sent;
          _context11.next = 15;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"Admin: ".concat(adminEmail, " has made ").concat(publicUserEmail, " an admin!\")")));

        case 15:
          updateNewsFeed = _context11.sent;
          _context11.next = 22;
          break;

        case 18:
          _context11.prev = 18;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          res.status(500).send(_context11.t0.message);

        case 22:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.lastSeenPetsQuery = function _callee12(allPetArrayIDsString, userID) {
  var updateEnquiryQuery;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject16(), allPetArrayIDsString, userID)));

        case 3:
          updateEnquiryQuery = _context12.sent;
          _context12.next = 10;
          break;

        case 6:
          _context12.prev = 6;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          res.status(500).send(_context12.t0.message);

        case 10:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 6]]);
};