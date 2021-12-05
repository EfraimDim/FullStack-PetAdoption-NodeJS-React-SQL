"use strict";

var _require = require('../models/classes'),
    users = _require.users;

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