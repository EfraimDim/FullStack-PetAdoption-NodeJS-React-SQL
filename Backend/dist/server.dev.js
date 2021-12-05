"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 5000;
app.use(express.json());
app.use(express["static"]('public'));

var usersRoute = require('./routes/usersRoute');

var petRoute = require('./routes/petRoute');

app.use('/users', usersRoute);
app.use('/pet', petRoute);
app.listen(port, function () {
  console.log("Listening on port ".concat(port, "..."));
});