const mysql = require("mysql")

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "sg35no4s",
    database: "pet-adoption"
});

const query = (queryText) => {
    return new Promise((resolve, reject) => {
        pool.query(queryText, (err, data) => {
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = {
    query
}