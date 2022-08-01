const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middlewareQueries = require("../queries/middlewareQueries");

exports.validateBody = (schema) => {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0]["message"]);
      return;
    }
    next();
  };
};

exports.checkEmailValidSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailValidation = await middlewareQueries.emailValidationQuery(email);
    if (emailValidation.length === 0) {
      next();
    } else {
      res.status(400).send("email already taken");
    }
  } catch (e) {
    console.error(e);
  }
};

exports.checkPasswordsMatch = (req, res, next) => {
  try {
    const { password, rePassword } = req.body;
    if (password === rePassword) {
      next();
    } else {
      res.status(400).send("passwords don't match!");
    }
  } catch (e) {
    console.error(e);
  }
};

exports.encryptPwd = (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).send("Error Encrypting");
        return;
      }
      req.body.password = hash;
      next();
    });
  } catch (e) {
    console.error(e);
  }
};

exports.decryptPwd = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailValidation = await middlewareQueries.emailValidationQuery(email);
    if (emailValidation.length === 0) {
      res.status(400).send("Email not found!");
    } else {
      bcrypt.compare(password, emailValidation[0].password, (err, result) => {
        if (result) {
          req.body.user = emailValidation[0];
          next();
        } else {
          res.status(400).send("Wrong Password!");
        }
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createToken = (req, res, next) => {
  try {
    const { user } = req.body;
    const token = jwt.sign({ userID: user.user_ID }, process.env.SECRET_KEY, { expiresIn: "1h" });
    req.token = token;
    next();
  } catch (e) {
    console.error(e);
  }
};

exports.authorization = (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) {
      res.status(401).send("Must provide a token");
      return;
    }
    const token = authHeaders.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send("Invalid Token");
        return;
      }
      req.decoded = decoded;
      next();
    });
  } catch (e) {
    console.error(e);
  }
};

exports.checkOldPasswordCorrect = async (req, res, next) => {
  try {
    const { oldPassword } = req.body;
    const { userID } = req.decoded;
    const userIDValidation = await middlewareQueries.userIDValidationQuery(userID);
    if (userIDValidation.length === 0) {
      res.status(400).send("user not found!");
    } else {
      bcrypt.compare(oldPassword, userIDValidation[0].password, (err, result) => {
        if (result) {
          next();
        } else {
          res.status(400).send("Wrong Password!");
        }
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.checkEmailValidProfileUpdate = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { userID } = req.decoded;
    const userIDValidation = await middlewareQueries.userIDValidationQuery(userID);
    if (userIDValidation[0].email === email) {
      next();
    } else {
      const emailValidation = await middlewareQueries.emailValidationQuery(email);
      if (emailValidation.length === 0) {
        next();
      } else {
        res.status(400).send("email already taken");
      }
    }
  } catch (e) {
    console.error(e);
  }
};

exports.checkIfStillAvailable = async (req, res, next) => {
  try {
    const { petID } = req.body;
    const availabilityCheck = await middlewareQueries.availabilityCheckQuery(petID);
    if (availabilityCheck[0].availability === 1) {
      next();
    } else {
      res.send("Sorry this pet is no longer available");
    }
  } catch (e) {
    console.error(e);
  }
};

exports.checkAdminAccountCreated = (req, res, next) => {
  try {
    const { adminCode } = req.body;
    if (adminCode) {
      if (adminCode === process.env.ADMIN_CODE) {
        next();
      } else {
        res.status(400).send("admin code not correct");
        return;
      }
    } else {
      next();
    }
  } catch (e) {
    console.error(e);
  }
};

exports.checkAdminForAllReq = async (req, res, next) => {
  try {
    const { userID } = req.decoded;
    const userIDValidation = await middlewareQueries.userIDValidationQuery(userID);
    if (userIDValidation[0].admin_status === 1) {
      next();
    } else {
      res.status(400).send("you are not authorised to do that!!");
    }
  } catch (e) {
    console.error(e);
  }
};
