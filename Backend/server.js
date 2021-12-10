const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(express.json());
app.use(cors())


const usersRoute = require('./routes/usersRoute');
const petRoute = require('./routes/petRoute')


app.use('/users', usersRoute);
app.use('/pets', petRoute);


app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})