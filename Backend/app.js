const express = require('express');
const app = express();
require('dotenv').config()
const logger = require('morgan');
const cors = require('cors')

app.use(express.json());
app.use(cors())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));


const usersRoute = require('./routes/usersRoute');
const petRoute = require('./routes/petRoute')




app.use('/users', usersRoute);
app.use('/pets', petRoute);


module.exports = app;