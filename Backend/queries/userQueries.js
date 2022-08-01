const SQL = require("@nearform/sql");
const { query } = require("../lib/mysql");

exports.signUpUserQuery = async (email, password, firstName, lastName, phoneNumber, admin, userID) => {
  try {
    const signUpUser = await query(
      SQL`INSERT INTO users (user_ID, email, password, first_name, last_name, phone, admin_status, bio) VALUES (${userID}, ${email.toLowerCase()}, ${password}, ${firstName}, ${lastName}, ${phoneNumber}, ${admin}, '')`
    );
    if (admin === true) {
      const updateNewsFeedAdminUser = await query(
        `INSERT INTO newsfeed (news) VALUES ("New Admin User! Email: ${email} Name: ${firstName} ${lastName}!")`
      );
    } else {
      const updateNewsFeedPublicUser = await query(
        `INSERT INTO newsfeed (news) VALUES ("New Public User! Email: ${email} Name: ${firstName} ${lastName}!")`
      );
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.updateUserPasswordQuery = async (password, userID) => {
  try {
    await query(SQL`UPDATE users SET password = ${password} WHERE user_ID = ${userID}`);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.updateUserProfileQuery = async (email, firstName, lastName, phoneNumber, bio, userID) => {
  try {
    const updateQuery = await query(
      SQL`UPDATE users SET email = ${email}, first_name = ${firstName}, last_name = ${lastName}, phone = ${phoneNumber}, bio = ${bio} WHERE user_ID = ${userID}`
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.adminUserNewsfeedArraysQuery = async () => {
  try {
    const usersArray = await query(SQL`SELECT user_ID, email, first_name, last_name, phone, bio, date_created, admin_status FROM users`);
    const newsfeedArray = await query(SQL`SELECT * FROM newsfeed`);
    const enquiryArray = await query(SQL`SELECT * FROM enquiry`);
    return { usersArray: usersArray, newsfeedArray: newsfeedArray, enquiryArray: enquiryArray };
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.getViewedUsersPetsQuery = async (viewedUserID) => {
  try {
    const viewedUsersPets = await query(SQL`SELECT * FROM pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID WHERE user_ID = ${viewedUserID}`);
    return viewedUsersPets;
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.sendEnquiryQuery = async (email, firstName, lastName, phone, enquiry, userID, enquiryID, dateCreated) => {
  try {
    const sendEnquiry = await query(
      SQL`INSERT INTO enquiry (user_ID, enquiry_ID, user_Email, first_name, last_name, phone, enquiry, date_created) VALUES (${userID}, ${enquiryID}, ${email}, ${firstName}, ${lastName}, ${phone}, ${enquiry}, ${dateCreated})`
    );
    const updateNewsFeedAdminUser = await query(
      `INSERT INTO newsfeed (news) VALUES ("New Enquiry! Email: ${email} Name: ${firstName} ${lastName} has sent an enquiry!")`
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.enquiryToInProgressQuery = async (enquiryID, adminEmail, userEmail, userID) => {
  try {
    const updateEnquiryQuery = await query(
      SQL`UPDATE enquiry SET admin_ID = ${userID}, admin_Email = ${adminEmail}, status = "in progress" WHERE enquiry_ID = ${enquiryID}`
    );
    const updateNewsFeed = await query(
      `INSERT INTO newsfeed (news) VALUES ("Enquiry Status Change! Admin: ${adminEmail} now resolving ${userEmail} enquiry")`
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.enquiryToResolvedQuery = async (enquiryID, adminEmail, userEmail, userID) => {
  try {
    const updateEnquiryQuery = await query(
      SQL`UPDATE enquiry SET admin_ID = ${userID}, admin_Email = ${adminEmail}, status = "resolved" WHERE enquiry_ID = ${enquiryID}`
    );
    const updateNewsFeed = await query(
      `INSERT INTO newsfeed (news) VALUES ("Enquiry Status Change! Admin: ${adminEmail} has resolved ${userEmail} enquiry!")`
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.enquiryToDeleteQuery = async (enquiryID) => {
  try {
    const deleteEnquiryQuery = await query(SQL`DELETE FROM enquiry WHERE enquiry_ID = ${enquiryID}`);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.enquirySearchQuery = async (email, date) => {
  try {
    const searchResults = await query(`SELECT * FROM enquiry WHERE user_Email LIKE '%${email}%' AND date_created LIKE '%${date}%'`);
    return searchResults;
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.makeAdminQuery = async (adminEmail, publicUserEmail, publicUserID) => {
  try {
    const updateToAdminQuery = await query(SQL`UPDATE users SET admin_status = TRUE  WHERE user_ID = ${publicUserID}`);
    const updateNewAdminsPets = await query(
      SQL`UPDATE pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID SET adoption_status = "available", availability = true WHERE user_ID = ${publicUserID} `
    );
    const deleteSavedPets = await query(SQL`DELETE FROM savedPets WHERE user_ID = ${publicUserID}`);
    const deleteAdoptedPets = await query(SQL`DELETE FROM adoptedPets WHERE user_ID = ${publicUserID}`);
    const updateNewsFeed = await query(`INSERT INTO newsfeed (news) VALUES ("Admin: ${adminEmail} has made ${publicUserEmail} an admin!")`);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.lastSeenPetsQuery = async (allPetArrayIDsString, userID) => {
  try {
    const updateEnquiryQuery = await query(SQL`UPDATE users SET last_seen_pet_IDs = ${allPetArrayIDsString} WHERE user_ID = ${userID}`);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
