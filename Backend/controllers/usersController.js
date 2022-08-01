const userQueries = require("../queries/userQueries");
const { v4: uuidv4 } = require("uuid");

exports.login = (req, res) => {
  try {
    const token = req.token;
    res.send({ token: token, userInfo: req.body.user, message: "Login Success!" });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.signUpUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, admin } = req.body;
    const userID = uuidv4();
    await userQueries.signUpUserQuery(email, password, firstName, lastName, phoneNumber, admin, userID);
    res.send("Register Succesful!");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { userID } = req.decoded;
    await userQueries.updateUserPasswordQuery(password, userID);
    res.send("Updated Password Succesfully!");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { email, firstName, lastName, phoneNumber, bio } = req.body;
    const { userID } = req.decoded;
    const updateQuery = await userQueries.updateUserProfileQuery(email, firstName, lastName, phoneNumber, bio, userID);
    res.send("Updated Profile Succesfully!");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.adminUserNewsfeedArrays = async (req, res) => {
  try {
    const adminArrays = await userQueries.adminUserNewsfeedArraysQuery();
    res.send({ usersArray: adminArrays.usersArray, newsfeedArray: adminArrays.newsfeedArray, enquiryArray: adminArrays.enquiryArray });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.getViewedUsersPets = async (req, res) => {
  try {
    const { viewedUserID } = req.query;
    const viewedUsersPets = await userQueries.getViewedUsersPetsQuery(viewedUserID);
    res.send(viewedUsersPets);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.sendEnquiry = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, enquiry } = req.body;
    const { userID } = req.decoded;
    const enquiryID = uuidv4();
    const dateCreated = new Date().toJSON().slice(0, 19).replace("T", " ");
    await userQueries.sendEnquiryQuery(email, firstName, lastName, phone, enquiry, userID, enquiryID, dateCreated);
    res.send("Enquiry Sent Succesful!");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.enquiryToInProgress = async (req, res) => {
  try {
    const { enquiryID, adminEmail, userEmail } = req.body;
    const { userID } = req.decoded;
    const updateEnquiryQuery = await userQueries.enquiryToInProgressQuery(enquiryID, adminEmail, userEmail, userID);
    res.send("Updated Enquiry Succesfully!");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.enquiryToResolved = async (req, res) => {
  try {
    const { enquiryID, adminEmail, userEmail } = req.body;
    const { userID } = req.decoded;
    const updateEnquiryQuery = await userQueries.enquiryToResolvedQuery(enquiryID, adminEmail, userEmail, userID);
    res.send("Updated Enquiry Succesfully!");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.enquiryToDelete = async (req, res) => {
  try {
    const { enquiryID } = req.params;
    const deleteEnquiryQuery = await userQueries.enquiryToDeleteQuery(enquiryID);
    res.send("Deleted Enquiry Succesfully!");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.enquirySearch = async (req, res) => {
  try {
    const { email, date } = req.query;
    const searchResults = await userQueries.enquirySearchQuery(email, date);
    res.send(searchResults);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.makeAdmin = async (req, res) => {
  try {
    const { adminEmail, publicUserEmail, publicUserID } = req.body;
    const updateToAdminQuery = await userQueries.makeAdminQuery(adminEmail, publicUserEmail, publicUserID);
    res.send("Updated Admin Succesfully!");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.lastSeenPets = async (req, res) => {
  try {
    const { allPetArrayIDsString } = req.body;
    const { userID } = req.decoded;
    const updateEnquiryQuery = await userQueries.lastSeenPetsQuery(allPetArrayIDsString, userID);
    res.send("Updated Succesfully!");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
