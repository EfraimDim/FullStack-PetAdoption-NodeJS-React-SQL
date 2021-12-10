require('./lib/config')
const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
const cors = require('cors')
const logger = require('morgan');
app.use(express.json());
app.use(cors())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

const usersRoute = require('./routes/usersRoute');
const petRoute = require('./routes/petRoute')


app.use('/users', usersRoute);
app.use('/pets', petRoute);


app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})