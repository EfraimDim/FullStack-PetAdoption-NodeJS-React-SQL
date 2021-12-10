"use strict";

var express = require('express');

var app = express();

require('dotenv').config();

var port = process.env.PORT || 5000;

var cors = require('cors');

app.use(express.json());
app.use(cors());

var usersRoute = require('./routes/usersRoute');

var petRoute = require('./routes/petRoute');

app.use('/users', usersRoute);
app.use('/pets', petRoute);
app.listen(port, function () {
  console.log("Listening on port ".concat(port, "..."));
});