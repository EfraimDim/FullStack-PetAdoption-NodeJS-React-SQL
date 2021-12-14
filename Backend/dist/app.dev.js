"use strict";

var express = require('express');

var app = express();

require('dotenv').config();

var logger = require('morgan');

var cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({
  extended: false
}));

var usersRoute = require('./routes/usersRoute');

var petRoute = require('./routes/petRoute');

app.use('/users', usersRoute);
app.use('/pets', petRoute);
module.exports = app;