const mysql = require('mysql');
const Postgrator = require('postgrator')
const path = require('path');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
exports.pool = pool;



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

exports.query = query;

const postgrator = new Postgrator({
  migrationDirectory: path.resolve(__dirname, '../migrations'),
  driver: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  schemaTable: 'migrations',
});

exports.postgrator = postgrator

exports.migrate = function () {
  return postgrator.migrate();
};

