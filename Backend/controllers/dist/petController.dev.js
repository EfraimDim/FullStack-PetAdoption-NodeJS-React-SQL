"use strict";

function _templateObject19() {
  var data = _taggedTemplateLiteral(["DELETE FROM savedPets WHERE pet_ID = ", " "]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["DELETE FROM adoptedPets WHERE pet_ID = ", " "]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["DELETE FROM pets WHERE pet_ID = ", " "]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["UPDATE pets SET type = ", ", adoption_status = ", ", name = ", ", color = ", ", height = ", ", weight = ", ", bio = ", ", dietry_restrictions = ", ", hypoallergenic = ", ", breed = ", ", availability = ", "  WHERE pet_ID = ", ""]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["UPDATE pets SET type = ", ", adoption_status = ", ", name = ", ", color = ", ", picture_path = ", ", height = ", ", weight = ", ", bio = ", ", dietry_restrictions = ", ", hypoallergenic = ", ", breed = ", ", availability = ", "  WHERE pet_ID = ", ""]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["INSERT INTO pets (pet_ID, type, name, adoption_status, picture_path, height, weight, color, bio, hypoallergenic, availability, dietry_restrictions, breed, date_created) VALUES (", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ", ")"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["SELECT * FROM pets WHERE type = ", ""]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["UPDATE pets SET adoption_status = \"fostered\", availability = FALSE WHERE pet_ID = ", ""]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["INSERT INTO adoptedPets (user_ID, pet_ID) VALUES (", ", ", ")"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["UPDATE pets SET adoption_status = \"adopted\", availability = FALSE WHERE pet_ID = ", ""]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["INSERT INTO adoptedPets (user_ID, pet_ID) VALUES (", ", ", ")"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["INSERT INTO savedPets (user_ID, pet_ID) VALUES (", ", ", ")"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["DELETE FROM savedPets WHERE user_ID = ", " AND pet_ID = ", ";"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["UPDATE pets SET adoption_status = \"adopted\"  WHERE pet_ID = ", ""]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["UPDATE pets SET adoption_status = \"available\", availability = TRUE  WHERE pet_ID = ", ""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["DELETE FROM adoptedPets WHERE user_ID = ", " AND pet_ID = ", ";"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["SELECT * FROM pets"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["SELECT * FROM pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID WHERE user_ID = ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["SELECT * FROM pets JOIN savedPets on pets.pet_ID = savedPets.pet_ID WHERE user_ID = ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SQL = require('@nearform/sql');

var _require = require('../lib/mysql'),
    query = _require.query;

var _require2 = require('uuid'),
    uuidv4 = _require2.v4;

exports.usersPetArrays = function _callee(req, res) {
  var userID, savedPetsArray, adoptedPetsArray;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userID = req.decoded.userID;
          _context.next = 4;
          return regeneratorRuntime.awrap(query(SQL(_templateObject(), userID)));

        case 4:
          savedPetsArray = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(query(SQL(_templateObject2(), userID)));

        case 7:
          adoptedPetsArray = _context.sent;
          res.send({
            savedPetsArray: savedPetsArray,
            adoptedPetsArray: adoptedPetsArray
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.status(500).send(_context.t0.message);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getAllPetsArray = function _callee2(req, res) {
  var allPetsArray;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(query(SQL(_templateObject3())));

        case 3:
          allPetsArray = _context2.sent;
          res.send(allPetsArray);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).send(_context2.t0.message);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.returnForAdoption = function _callee3(req, res) {
  var _req$params, petID, petName, petType, userEmail, userID, deleteFromMyPetsArray, updateAdoptionStatus, updateNewsFeed;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$params = req.params, petID = _req$params.petID, petName = _req$params.petName, petType = _req$params.petType, userEmail = _req$params.userEmail;
          userID = req.decoded.userID;
          _context3.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject4(), userID, petID)));

        case 5:
          deleteFromMyPetsArray = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(query(SQL(_templateObject5(), petID)));

        case 8:
          updateAdoptionStatus = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"".concat(userEmail, " has returned ").concat(petName, " the ").concat(petType, " back for adoption\")")));

        case 11:
          updateNewsFeed = _context3.sent;
          res.send("Returned Succesfully!");
          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).send(_context3.t0.message);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.fosterToAdopt = function _callee4(req, res) {
  var _req$body, petID, name, type, userEmail, updateAdoptionStatus, updateNewsFeed;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body = req.body, petID = _req$body.petID, name = _req$body.name, type = _req$body.type, userEmail = _req$body.userEmail;
          _context4.next = 4;
          return regeneratorRuntime.awrap(query(SQL(_templateObject6(), petID)));

        case 4:
          updateAdoptionStatus = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"".concat(userEmail, " had now adopted ").concat(name, " the ").concat(type, " from fostering!\")")));

        case 7:
          updateNewsFeed = _context4.sent;
          res.send("Updated Succesfully!");
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).send(_context4.t0.message);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.unsavePet = function _callee5(req, res) {
  var petID, userID, deleteFromSavedPetsArray;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          petID = req.params.petID;
          userID = req.decoded.userID;
          _context5.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject7(), userID, petID)));

        case 5:
          deleteFromSavedPetsArray = _context5.sent;
          res.send("Unsaved Succesfully!");
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).send(_context5.t0.message);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.savePet = function _callee6(req, res) {
  var petID, userID, savePet;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          petID = req.body.petID;
          userID = req.decoded.userID;
          _context6.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject8(), userID, petID)));

        case 5:
          savePet = _context6.sent;
          res.send("Saved Succesfully!");
          _context6.next = 13;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).send(_context6.t0.message);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.adoptPet = function _callee7(req, res) {
  var _req$body2, petID, name, type, userEmail, userID, adoptPet, availabilityChange, updateNewsFeed;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body2 = req.body, petID = _req$body2.petID, name = _req$body2.name, type = _req$body2.type, userEmail = _req$body2.userEmail;
          userID = req.decoded.userID;
          _context7.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject9(), userID, petID)));

        case 5:
          adoptPet = _context7.sent;
          _context7.next = 8;
          return regeneratorRuntime.awrap(query(SQL(_templateObject10(), petID)));

        case 8:
          availabilityChange = _context7.sent;
          _context7.next = 11;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"".concat(userEmail, " had now adopted ").concat(name, " the ").concat(type, "!\")")));

        case 11:
          updateNewsFeed = _context7.sent;
          res.send("Adoption Success!");
          _context7.next = 19;
          break;

        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(500).send(_context7.t0.message);

        case 19:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.fosterPet = function _callee8(req, res) {
  var _req$body3, petID, name, type, userEmail, userID, fosterPet, availabilityChange, updateNewsFeed;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body3 = req.body, petID = _req$body3.petID, name = _req$body3.name, type = _req$body3.type, userEmail = _req$body3.userEmail;
          userID = req.decoded.userID;
          _context8.next = 5;
          return regeneratorRuntime.awrap(query(SQL(_templateObject11(), userID, petID)));

        case 5:
          fosterPet = _context8.sent;
          _context8.next = 8;
          return regeneratorRuntime.awrap(query(SQL(_templateObject12(), petID)));

        case 8:
          availabilityChange = _context8.sent;
          _context8.next = 11;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"".concat(userEmail, " is now fostering ").concat(name, " the ").concat(type, "!\")")));

        case 11:
          updateNewsFeed = _context8.sent;
          res.send("Foster Success!");
          _context8.next = 19;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          res.status(500).send(_context8.t0.message);

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.basicSearch = function _callee9(req, res) {
  var type, searchResults;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          type = req.query.type;
          _context9.next = 4;
          return regeneratorRuntime.awrap(query(SQL(_templateObject13(), type)));

        case 4:
          searchResults = _context9.sent;
          res.send(searchResults);
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

exports.advanceSearch = function _callee10(req, res) {
  var _req$params2, type, adoptionStatus, minHeight, maxHeight, minWeight, maxWeight, name, searchResults;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$params2 = req.params, type = _req$params2.type, adoptionStatus = _req$params2.adoptionStatus, minHeight = _req$params2.minHeight, maxHeight = _req$params2.maxHeight, minWeight = _req$params2.minWeight, maxWeight = _req$params2.maxWeight;
          name = req.query.name;
          _context10.next = 5;
          return regeneratorRuntime.awrap(query("SELECT * FROM pets WHERE type = \"".concat(type, "\" AND adoption_status = '").concat(adoptionStatus, "' AND weight >= ").concat(minWeight, " AND weight <= ").concat(maxWeight, " AND height >= ").concat(minHeight, " AND height <= ").concat(maxHeight, " AND name LIKE '%").concat(name, "%'")));

        case 5:
          searchResults = _context10.sent;
          res.send(searchResults);
          _context10.next = 13;
          break;

        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          res.status(500).send(_context10.t0.message);

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.addPet = function _callee11(req, res) {
  var filename, _req$body4, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail, parseHeight, parseWeight, parseHypoallergenic, availability, petID, date, updateNewsFeed;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          filename = req.file.filename;
          _req$body4 = req.body, type = _req$body4.type, adoptionStatus = _req$body4.adoptionStatus, name = _req$body4.name, colour = _req$body4.colour, height = _req$body4.height, weight = _req$body4.weight, bio = _req$body4.bio, dietryRestrictions = _req$body4.dietryRestrictions, hypoallergenic = _req$body4.hypoallergenic, breed = _req$body4.breed, adminEmail = _req$body4.adminEmail;
          parseHeight = JSON.parse(height);
          parseWeight = JSON.parse(weight);
          parseHypoallergenic = JSON.parse(hypoallergenic);
          availability = false;

          if (adoptionStatus === "available") {
            availability = true;
          }

          petID = uuidv4();
          date = new Date().toISOString().slice(0, 19).replace('T', ' ');
          _context11.next = 12;
          return regeneratorRuntime.awrap(query(SQL(_templateObject14(), petID, type, name, adoptionStatus, filename, parseHeight, parseWeight, colour, bio, parseHypoallergenic, availability, dietryRestrictions, breed, date)));

        case 12:
          _context11.next = 14;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"Admin: ".concat(adminEmail, " has added ").concat(name, " the ").concat(type, " to the database!\")")));

        case 14:
          updateNewsFeed = _context11.sent;
          res.send("Added Successfully!");
          _context11.next = 21;
          break;

        case 18:
          _context11.prev = 18;
          _context11.t0 = _context11["catch"](0);
          res.status(500).send(_context11.t0.message);

        case 21:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.editPetWithNewPhoto = function _callee12(req, res) {
  var filename, _req$body5, petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail, parseHeight, parseWeight, parseHypoallergenic, availability, updatePet, updateNewsFeed;

  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          filename = req.file.filename;
          _req$body5 = req.body, petID = _req$body5.petID, type = _req$body5.type, adoptionStatus = _req$body5.adoptionStatus, name = _req$body5.name, colour = _req$body5.colour, height = _req$body5.height, weight = _req$body5.weight, bio = _req$body5.bio, dietryRestrictions = _req$body5.dietryRestrictions, hypoallergenic = _req$body5.hypoallergenic, breed = _req$body5.breed, adminEmail = _req$body5.adminEmail;
          parseHeight = JSON.parse(height);
          parseWeight = JSON.parse(weight);
          parseHypoallergenic = JSON.parse(hypoallergenic);
          availability = false;

          if (adoptionStatus === "available") {
            availability = true;
          }

          _context12.next = 10;
          return regeneratorRuntime.awrap(query(SQL(_templateObject15(), type, adoptionStatus, name, colour, filename, parseHeight, parseWeight, bio, dietryRestrictions, parseHypoallergenic, breed, availability, petID)));

        case 10:
          updatePet = _context12.sent;
          _context12.next = 13;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"Admin: ".concat(adminEmail, " has edited the information of ").concat(name, " the ").concat(type, " and added a new photo!\")")));

        case 13:
          updateNewsFeed = _context12.sent;
          res.send("Updated Successfully!");
          _context12.next = 21;
          break;

        case 17:
          _context12.prev = 17;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          res.status(500).send(_context12.t0.message);

        case 21:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.editPetWithoutNewPhoto = function _callee13(req, res) {
  var _req$body6, petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail, availability, updatePet, updateNewsFeed;

  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _req$body6 = req.body, petID = _req$body6.petID, type = _req$body6.type, adoptionStatus = _req$body6.adoptionStatus, name = _req$body6.name, colour = _req$body6.colour, height = _req$body6.height, weight = _req$body6.weight, bio = _req$body6.bio, dietryRestrictions = _req$body6.dietryRestrictions, hypoallergenic = _req$body6.hypoallergenic, breed = _req$body6.breed, adminEmail = _req$body6.adminEmail;
          availability = false;

          if (adoptionStatus === "available") {
            availability = true;
          }

          _context13.next = 6;
          return regeneratorRuntime.awrap(query(SQL(_templateObject16(), type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, availability, petID)));

        case 6:
          updatePet = _context13.sent;
          _context13.next = 9;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"Admin: ".concat(adminEmail, " has edited the information of ").concat(name, " the ").concat(type, "!\")")));

        case 9:
          updateNewsFeed = _context13.sent;
          res.send("Updated Successfully!");
          _context13.next = 17;
          break;

        case 13:
          _context13.prev = 13;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          res.status(500).send(_context13.t0.message);

        case 17:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.deletePet = function _callee14(req, res) {
  var _req$params3, petID, petName, petType, adminEmail, deletePet, deletePetAdopted, deletePetSaved, updateNewsFeed;

  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _req$params3 = req.params, petID = _req$params3.petID, petName = _req$params3.petName, petType = _req$params3.petType, adminEmail = _req$params3.adminEmail;
          _context14.next = 4;
          return regeneratorRuntime.awrap(query(SQL(_templateObject17(), petID)));

        case 4:
          deletePet = _context14.sent;
          _context14.next = 7;
          return regeneratorRuntime.awrap(query(SQL(_templateObject18(), petID)));

        case 7:
          deletePetAdopted = _context14.sent;
          _context14.next = 10;
          return regeneratorRuntime.awrap(query(SQL(_templateObject19(), petID)));

        case 10:
          deletePetSaved = _context14.sent;
          _context14.next = 13;
          return regeneratorRuntime.awrap(query("INSERT INTO newsfeed (news) VALUES (\"Admin: ".concat(adminEmail, " has deleted ").concat(petName, " the ").concat(petType, " from all databases!\")")));

        case 13:
          updateNewsFeed = _context14.sent;
          res.send("Delete Succesful!");
          _context14.next = 21;
          break;

        case 17:
          _context14.prev = 17;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);
          res.status(500).send(_context14.t0.message);

        case 21:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 17]]);
};