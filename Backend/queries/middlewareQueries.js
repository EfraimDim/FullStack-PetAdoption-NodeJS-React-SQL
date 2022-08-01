const { query } = require("../lib/mysql");

exports.emailValidationQuery = async (email) => {
  try {
    const emailValidation = await query(`SELECT * FROM users WHERE email = '${email.toLowerCase()}'`);
    return emailValidation;
  } catch (e) {
    console.error(e);
  }
};

exports.userIDValidationQuery = async (userID) => {
  try {
    const userIDValidation = await query(`SELECT * FROM users WHERE user_ID = '${userID}'`);
    return userIDValidation;
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.availabilityCheckQuery = async (petID) => {
  try {
    const availabilityCheck = await query(`SELECT availability FROM pets WHERE pet_ID = '${petID}'`);
    return availabilityCheck;
  } catch (e) {
    console.error(e);
  }
};
