"use strict";

exports.login = function (req, res) {
  try {
    var token = req.token;
    res.send(token);
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: e.message
    });
  }
};

exports.addPublicUser = function (req, res) {
  try {
    var body = req.body;
    users.addUser(new User(body.username, body.email, body.password, body.role));
    res.send("Register Succesful!");
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: e.message
    });
  }
};