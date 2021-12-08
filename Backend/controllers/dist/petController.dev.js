"use strict";

var _require = require('../models/queryModel'),
    query = _require.query;

var _require2 = require('uuid'),
    uuidv4 = _require2.v4;

exports.getSavedPetsArray = function _callee(req, res) {
  var userID, savedPetsArray;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userID = req.decoded.userID;
          _context.next = 4;
          return regeneratorRuntime.awrap(query("SELECT * FROM pets JOIN savedPets on pets.pet_ID = savedPets.pet_ID WHERE user_ID = \"".concat(userID, "\"")));

        case 4:
          savedPetsArray = _context.sent;
          res.send(savedPetsArray);
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

exports.getAdoptedPetsArray = function _callee2(req, res) {
  var userID, adoptedPetsArray;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userID = req.decoded.userID;
          _context2.next = 4;
          return regeneratorRuntime.awrap(query("SELECT * FROM pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID WHERE user_ID = \"".concat(userID, "\"")));

        case 4:
          adoptedPetsArray = _context2.sent;
          res.send(adoptedPetsArray);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAllPetsArray = function _callee3(req, res) {
  var allPetsArray;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(query("SELECT * FROM pets"));

        case 3:
          allPetsArray = _context3.sent;
          res.send(allPetsArray);
          _context3.next = 10;
          break;

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

exports.returnForAdoption = function _callee4(req, res) {
  var petID, userID, deleteFromMyPetsArray, updateAdoptionStatus;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          petID = req.params.petID;
          userID = req.decoded.userID;
          _context4.next = 5;
          return regeneratorRuntime.awrap(query("DELETE FROM adoptedPets WHERE user_ID = \"".concat(userID, "\" AND pet_ID = \"").concat(petID, "\";")));

        case 5:
          deleteFromMyPetsArray = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(query("UPDATE pets SET adoption_status = \"available\", availability = TRUE  WHERE pet_ID = \"".concat(petID, "\"")));

        case 8:
          updateAdoptionStatus = _context4.sent;
          res.send("Returned Succesfully!");
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.fosterToAdopt = function _callee5(req, res) {
  var petID, updateAdoptionStatus;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          petID = req.body.petID;
          _context5.next = 4;
          return regeneratorRuntime.awrap(query("UPDATE pets SET adoption_status = \"adopted\"  WHERE pet_ID = \"".concat(petID, "\"")));

        case 4:
          updateAdoptionStatus = _context5.sent;
          res.send("Updated Succesfully!");
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

exports.unsavePet = function _callee6(req, res) {
  var petID, userID, deleteFromSavedPetsArray;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          petID = req.params.petID;
          userID = req.decoded.userID;
          _context6.next = 5;
          return regeneratorRuntime.awrap(query("DELETE FROM savedPets WHERE user_ID = \"".concat(userID, "\" AND pet_ID = \"").concat(petID, "\";")));

        case 5:
          deleteFromSavedPetsArray = _context6.sent;
          res.send("Unsaved Succesfully!");
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.savePet = function _callee7(req, res) {
  var petID, userID, savePet;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          petID = req.body.petID;
          userID = req.decoded.userID;
          _context7.next = 5;
          return regeneratorRuntime.awrap(query("INSERT INTO savedPets (user_ID, pet_ID) VALUES (\"".concat(userID, "\", \"").concat(petID, "\")")));

        case 5:
          savePet = _context7.sent;
          res.send("Saved Succesfully!");
          _context7.next = 12;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.adoptPet = function _callee8(req, res) {
  var petID, userID, adoptPet, availabilityChange;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          petID = req.body.petID;
          userID = req.decoded.userID;
          _context8.next = 5;
          return regeneratorRuntime.awrap(query("INSERT INTO adoptedPets (user_ID, pet_ID) VALUES (\"".concat(userID, "\", \"").concat(petID, "\")")));

        case 5:
          adoptPet = _context8.sent;
          _context8.next = 8;
          return regeneratorRuntime.awrap(query("UPDATE pets SET adoption_status = \"adopted\", availability = FALSE WHERE pet_ID = \"".concat(petID, "\"")));

        case 8:
          availabilityChange = _context8.sent;
          res.send("Adoption Success!");
          _context8.next = 15;
          break;

        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.fosterPet = function _callee9(req, res) {
  var petID, userID, fosterPet, availabilityChange;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          petID = req.body.petID;
          userID = req.decoded.userID;
          _context9.next = 5;
          return regeneratorRuntime.awrap(query("INSERT INTO adoptedPets (user_ID, pet_ID) VALUES (\"".concat(userID, "\", \"").concat(petID, "\")")));

        case 5:
          fosterPet = _context9.sent;
          _context9.next = 8;
          return regeneratorRuntime.awrap(query("UPDATE pets SET adoption_status = \"fostered\", availability = FALSE WHERE pet_ID = \"".concat(petID, "\"")));

        case 8:
          availabilityChange = _context9.sent;
          res.send("Foster Success!");
          _context9.next = 15;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.basicSearch = function _callee10(req, res) {
  var type, searchResults;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          type = req.query.type;
          _context10.next = 4;
          return regeneratorRuntime.awrap(query("SELECT * FROM pets WHERE type = \"".concat(type, "\"")));

        case 4:
          searchResults = _context10.sent;
          res.send(searchResults);
          _context10.next = 11;
          break;

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.advanceSearch = function _callee11(req, res) {
  var _req$params, type, adoptionStatus, minHeight, maxHeight, minWeight, maxWeight, name, searchResults;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$params = req.params, type = _req$params.type, adoptionStatus = _req$params.adoptionStatus, minHeight = _req$params.minHeight, maxHeight = _req$params.maxHeight, minWeight = _req$params.minWeight, maxWeight = _req$params.maxWeight;
          name = req.query.name;
          _context11.next = 5;
          return regeneratorRuntime.awrap(query("SELECT * FROM pets WHERE type = \"".concat(type, "\" AND adoption_status = \"").concat(adoptionStatus, "\" AND weight >= ").concat(minWeight, " AND weight <= ").concat(maxWeight, " AND height >= ").concat(minHeight, " AND height <= ").concat(maxHeight, " AND name LIKE '%").concat(name, "%'")));

        case 5:
          searchResults = _context11.sent;
          res.send(searchResults);
          _context11.next = 12;
          break;

        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.addPet = function _callee12(req, res) {
  var filename, _req$body, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, parseHeight, parseWeight, parseHypoallergenic, availability, petID, date;

  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          filename = req.file.filename;
          _req$body = req.body, type = _req$body.type, adoptionStatus = _req$body.adoptionStatus, name = _req$body.name, colour = _req$body.colour, height = _req$body.height, weight = _req$body.weight, bio = _req$body.bio, dietryRestrictions = _req$body.dietryRestrictions, hypoallergenic = _req$body.hypoallergenic, breed = _req$body.breed;
          parseHeight = JSON.parse(height);
          parseWeight = JSON.parse(weight);
          parseHypoallergenic = JSON.parse(hypoallergenic);
          availability = false;

          if (adoptionStatus === "available") {
            availability = true;
          }

          petID = uuidv4();
          date = new Date().toISOString().slice(0, 19).replace('T', ' ');
          _context12.next = 12;
          return regeneratorRuntime.awrap(query("INSERT INTO pets (pet_ID, type, name, adoption_status, picture_path, height, weight, color, bio, hypoallergenic, availability, dietry_restrictions, breed, date_created) VALUES ('".concat(petID, "', '").concat(type, "', '").concat(name, "', '").concat(adoptionStatus, "', '").concat(filename, "', ").concat(parseHeight, ", ").concat(parseWeight, ", '").concat(colour, "', '").concat(bio, "', ").concat(parseHypoallergenic, ", ").concat(availability, ", '").concat(dietryRestrictions, "', '").concat(breed, "', '").concat(date, "')")));

        case 12:
          res.send("Added Successfully!");
          _context12.next = 18;
          break;

        case 15:
          _context12.prev = 15;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);

        case 18:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 15]]);
};