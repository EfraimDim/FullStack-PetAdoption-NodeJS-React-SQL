const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static('public'));

const usersRoute = require('./routes/usersRoute');
const petRoute = require('./routes/petRoute')


app.use('/users', usersRoute);
app.use('/pets', petRoute);


app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})