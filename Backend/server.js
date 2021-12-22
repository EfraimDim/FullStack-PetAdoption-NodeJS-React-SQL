const app = require('./app')

const {postgrator} = require('./lib/mysql')
const port = process.env.PORT || 5000;


postgrator.migrate().then((result )=>{
    console.log(`migrated succesfully!`, result)
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`)
    })})
    .catch((error)=>console.error(error));


