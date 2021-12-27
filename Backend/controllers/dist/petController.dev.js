"use strict";

var petQueries = require('../queries/petQueries');

var _require = require('uuid'),
    uuidv4 = _require.v4;

var fs = require('fs');

exports.usersPetArrays = function _callee(req, res) {
  var userID, petArrays;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userID = req.decoded.userID;
          _context.next = 4;
          return regeneratorRuntime.awrap(petQueries.usersPetArraysQuery(userID));

        case 4:
          petArrays = _context.sent;
          res.send({
            savedPetsArray: petArrays.savedPetsArray,
            adoptedPetsArray: petArrays.adoptedPetsArray
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).send(_context.t0.message);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAllPetsArray = function _callee2(req, res) {
  var allPetsArray;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(petQueries.getAllPetsArrayQuery());

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
  var _req$params, petID, petName, petType, userEmail, userID;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$params = req.params, petID = _req$params.petID, petName = _req$params.petName, petType = _req$params.petType, userEmail = _req$params.userEmail;
          userID = req.decoded.userID;
          _context3.next = 5;
          return regeneratorRuntime.awrap(petQueries.returnForAdoptionQuery(petID, petName, petType, userEmail, userID));

        case 5:
          res.send("Returned Succesfully!");
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).send(_context3.t0.message);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.fosterToAdopt = function _callee4(req, res) {
  var _req$body, petID, name, type, userEmail;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body = req.body, petID = _req$body.petID, name = _req$body.name, type = _req$body.type, userEmail = _req$body.userEmail;
          _context4.next = 4;
          return regeneratorRuntime.awrap(petQueries.fosterToAdoptQuery(petID, name, type, userEmail));

        case 4:
          res.send("Updated Succesfully!");
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).send(_context4.t0.message);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.unsavePet = function _callee5(req, res) {
  var petID, userID;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          petID = req.params.petID;
          userID = req.decoded.userID;
          _context5.next = 5;
          return regeneratorRuntime.awrap(petQueries.unsavePetQuery(petID, userID));

        case 5:
          res.send("Unsaved Succesfully!");
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).send(_context5.t0.message);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.savePet = function _callee6(req, res) {
  var petID, userID;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          petID = req.body.petID;
          userID = req.decoded.userID;
          _context6.next = 5;
          return regeneratorRuntime.awrap(petQueries.savePetQuery(petID, userID));

        case 5:
          res.send("Saved Succesfully!");
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).send(_context6.t0.message);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.adoptPet = function _callee7(req, res) {
  var _req$body2, petID, name, type, userEmail, userID;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body2 = req.body, petID = _req$body2.petID, name = _req$body2.name, type = _req$body2.type, userEmail = _req$body2.userEmail;
          userID = req.decoded.userID;
          _context7.next = 5;
          return regeneratorRuntime.awrap(petQueries.adoptPetQuery(petID, name, type, userEmail, userID));

        case 5:
          res.send("Adoption Success!");
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(500).send(_context7.t0.message);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.fosterPet = function _callee8(req, res) {
  var _req$body3, petID, name, type, userEmail, userID;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body3 = req.body, petID = _req$body3.petID, name = _req$body3.name, type = _req$body3.type, userEmail = _req$body3.userEmail;
          userID = req.decoded.userID;
          _context8.next = 5;
          return regeneratorRuntime.awrap(petQueries.fosterPetQuery(petID, name, type, userEmail, userID));

        case 5:
          res.send("Foster Success!");
          _context8.next = 12;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          res.status(500).send(_context8.t0.message);

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
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
          return regeneratorRuntime.awrap(petQueries.basicSearchQuery(type));

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
          return regeneratorRuntime.awrap(petQueries.advanceSearchQuery(type, adoptionStatus, minHeight, maxHeight, minWeight, maxWeight, name));

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
  var filename, _req$body4, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail, parseHeight, parseWeight, parseHypoallergenic, availability, petID, date;

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
          return regeneratorRuntime.awrap(petQueries.addPetQuery(filename, type, adoptionStatus, name, colour, parseHeight, parseWeight, bio, dietryRestrictions, parseHypoallergenic, breed, adminEmail, availability, petID, date));

        case 12:
          res.send("Added Successfully!");
          _context11.next = 18;
          break;

        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](0);
          res.status(500).send(_context11.t0.message);

        case 18:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.editPetWithNewPhoto = function _callee12(req, res) {
  var filename, _req$body5, petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail, oldPicturePath, parseHeight, parseWeight, parseHypoallergenic, availability;

  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          filename = req.file.filename;
          _req$body5 = req.body, petID = _req$body5.petID, type = _req$body5.type, adoptionStatus = _req$body5.adoptionStatus, name = _req$body5.name, colour = _req$body5.colour, height = _req$body5.height, weight = _req$body5.weight, bio = _req$body5.bio, dietryRestrictions = _req$body5.dietryRestrictions, hypoallergenic = _req$body5.hypoallergenic, breed = _req$body5.breed, adminEmail = _req$body5.adminEmail, oldPicturePath = _req$body5.oldPicturePath;
          parseHeight = JSON.parse(height);
          parseWeight = JSON.parse(weight);
          parseHypoallergenic = JSON.parse(hypoallergenic);
          availability = false;

          if (adoptionStatus === "available") {
            availability = true;
          }

          _context12.next = 10;
          return regeneratorRuntime.awrap(petQueries.editPetWithNewPhotoQuery(filename, petID, type, adoptionStatus, name, colour, parseHeight, parseWeight, bio, dietryRestrictions, parseHypoallergenic, breed, adminEmail, availability));

        case 10:
          fs.unlinkSync("../frontend/src/images/".concat(oldPicturePath));
          res.send("Updated Successfully!");
          _context12.next = 18;
          break;

        case 14:
          _context12.prev = 14;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          res.status(500).send(_context12.t0.message);

        case 18:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.editPetWithoutNewPhoto = function _callee13(req, res) {
  var _req$body6, petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail, availability;

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
          return regeneratorRuntime.awrap(petQueries.editPetWithoutNewPhotoQuery(petID, type, adoptionStatus, name, colour, height, weight, bio, dietryRestrictions, hypoallergenic, breed, adminEmail, availability));

        case 6:
          res.send("Updated Successfully!");
          _context13.next = 13;
          break;

        case 9:
          _context13.prev = 9;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          res.status(500).send(_context13.t0.message);

        case 13:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.deletePet = function _callee14(req, res) {
  var _req$params3, petID, petName, petType, adminEmail, picture_path;

  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _req$params3 = req.params, petID = _req$params3.petID, petName = _req$params3.petName, petType = _req$params3.petType, adminEmail = _req$params3.adminEmail, picture_path = _req$params3.picture_path;
          _context14.next = 4;
          return regeneratorRuntime.awrap(petQueries.deletePetQuery(petID, petName, petType, adminEmail));

        case 4:
          fs.unlinkSync("../frontend/src/images/".concat(picture_path));
          res.send("Delete Succesful!");
          _context14.next = 12;
          break;

        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);
          res.status(500).send(_context14.t0.message);

        case 12:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 8]]);
};