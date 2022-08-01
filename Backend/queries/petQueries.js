const SQL = require("@nearform/sql");
const { query } = require("../lib/mysql");

exports.usersPetArraysQuery = async (userID) => {
  try {
    const savedPetsArray = await query(SQL`SELECT * FROM pets JOIN savedPets on pets.pet_ID = savedPets.pet_ID WHERE user_ID = ${userID}`);
    const adoptedPetsArray = await query(SQL`SELECT * FROM pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID WHERE user_ID = ${userID}`);
    return { savedPetsArray: savedPetsArray, adoptedPetsArray: adoptedPetsArray };
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.getAllPetsArrayQuery = async () => {
  try {
    const allPetsArray = await query(SQL`SELECT * FROM pets`);
    return allPetsArray;
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.returnForAdoptionQuery = async (petID, petName, petType, userEmail, userID) => {
  try {
    const deleteFromMyPetsArray = await query(SQL`DELETE FROM adoptedPets WHERE user_ID = ${userID} AND pet_ID = ${petID};`);
    const updateAdoptionStatus = await query(SQL`UPDATE pets SET adoption_status = "available", availability = TRUE  WHERE pet_ID = ${petID}`);
    const updateNewsFeed = await query(
      `INSERT INTO newsfeed (news) VALUES ("${userEmail} has returned ${petName} the ${petType} back for adoption")`
    );
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.fosterToAdoptQuery = async (petID, name, type, userEmail) => {
  try {
    const updateAdoptionStatus = await query(SQL`UPDATE pets SET adoption_status = "adopted"  WHERE pet_ID = ${petID}`);
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("${userEmail} had now adopted ${name} the ${type} from fostering!")`);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.unsavePetQuery = async (petID, userID) => {
  try {
    const deleteFromSavedPetsArray = await query(SQL`DELETE FROM savedPets WHERE user_ID = ${userID} AND pet_ID = ${petID};`);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.savePetQuery = async (petID, userID) => {
  try {
    const savePet = await query(SQL`INSERT INTO savedPets (user_ID, pet_ID) VALUES (${userID}, ${petID})`);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.adoptPetQuery = async (petID, name, type, userEmail, userID) => {
  try {
    const adoptPet = await query(SQL`INSERT INTO adoptedPets (user_ID, pet_ID) VALUES (${userID}, ${petID})`);
    const availabilityChange = await query(SQL`UPDATE pets SET adoption_status = "adopted", availability = FALSE WHERE pet_ID = ${petID}`);
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("${userEmail} had now adopted ${name} the ${type}!")`);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.fosterPetQuery = async (petID, name, type, userEmail, userID) => {
  try {
    const fosterPet = await query(SQL`INSERT INTO adoptedPets (user_ID, pet_ID) VALUES (${userID}, ${petID})`);
    const availabilityChange = await query(SQL`UPDATE pets SET adoption_status = "fostered", availability = FALSE WHERE pet_ID = ${petID}`);
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("${userEmail} is now fostering ${name} the ${type}!")`);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.basicSearchQuery = async (type) => {
  try {
    const searchResults = await query(SQL`SELECT * FROM pets WHERE type = ${type}`);
    return searchResults;
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.advanceSearchQuery = async (type, adoptionStatus, minHeight, maxHeight, minWeight, maxWeight, name) => {
  try {
    const searchResults = await query(
      `SELECT * FROM pets WHERE type = "${type}" AND adoption_status = '${adoptionStatus}' AND weight >= ${minWeight} AND weight <= ${maxWeight} AND height >= ${minHeight} AND height <= ${maxHeight} AND name LIKE '%${name}%'`
    );
    return searchResults;
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.addPetQuery = async (
  filename,
  type,
  adoptionStatus,
  name,
  colour,
  parseHeight,
  parseWeight,
  bio,
  dietryRestrictions,
  parseHypoallergenic,
  breed,
  adminEmail,
  availability,
  petID,
  date
) => {
  try {
    const addPet = await query(
      SQL`INSERT INTO pets (pet_ID, type, name, adoption_status, picture_path, height, weight, color, bio, hypoallergenic, availability, dietry_restrictions, breed, date_created) VALUES (${petID}, ${type}, ${name}, ${adoptionStatus}, ${filename}, ${parseHeight}, ${parseWeight}, ${colour}, ${bio}, ${parseHypoallergenic}, ${availability}, ${dietryRestrictions}, ${breed}, ${date})`
    );
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("Admin: ${adminEmail} has added ${name} the ${type} to the database!")`);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.editPetWithNewPhotoQuery = async (
  filename,
  petID,
  type,
  adoptionStatus,
  name,
  colour,
  parseHeight,
  parseWeight,
  bio,
  dietryRestrictions,
  parseHypoallergenic,
  breed,
  adminEmail,
  availability
) => {
  try {
    const updatePet = await query(
      SQL`UPDATE pets SET type = ${type}, adoption_status = ${adoptionStatus}, name = ${name}, color = ${colour}, picture_path = ${filename}, height = ${parseHeight}, weight = ${parseWeight}, bio = ${bio}, dietry_restrictions = ${dietryRestrictions}, hypoallergenic = ${parseHypoallergenic}, breed = ${breed}, availability = ${availability}  WHERE pet_ID = ${petID}`
    );
    const updateNewsFeed = await query(
      `INSERT INTO newsfeed (news) VALUES ("Admin: ${adminEmail} has edited the information of ${name} the ${type} and added a new photo!")`
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.editPetWithoutNewPhotoQuery = async (
  petID,
  type,
  adoptionStatus,
  name,
  colour,
  height,
  weight,
  bio,
  dietryRestrictions,
  hypoallergenic,
  breed,
  adminEmail,
  availability
) => {
  try {
    const updatePet = await query(
      SQL`UPDATE pets SET type = ${type}, adoption_status = ${adoptionStatus}, name = ${name}, color = ${colour}, height = ${height}, weight = ${weight}, bio = ${bio}, dietry_restrictions = ${dietryRestrictions}, hypoallergenic = ${hypoallergenic}, breed = ${breed}, availability = ${availability}  WHERE pet_ID = ${petID}`
    );
    const updateNewsFeed = await query(
      `INSERT INTO newsfeed (news) VALUES ("Admin: ${adminEmail} has edited the information of ${name} the ${type}!")`
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.deletePetQuery = async (petID, petName, petType, adminEmail) => {
  try {
    const deletePet = await query(SQL`DELETE FROM pets WHERE pet_ID = ${petID} `);
    const deletePetAdopted = await query(SQL`DELETE FROM adoptedPets WHERE pet_ID = ${petID} `);
    const deletePetSaved = await query(SQL`DELETE FROM savedPets WHERE pet_ID = ${petID} `);
    const updateNewsFeed = await query(
      `INSERT INTO newsfeed (news) VALUES ("Admin: ${adminEmail} has deleted ${petName} the ${petType} from all databases!")`
    );
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};
