"use strict";

var mysql = require('mysql');

var Postgrator = require('postgrator');

var path = require('path');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
exports.pool = pool;

var query = function query(queryText) {
  return new Promise(function (resolve, reject) {
    pool.query(queryText, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.query = query;
var postgrator = new Postgrator({
  migrationDirectory: path.resolve(__dirname, '../migrations'),
  driver: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  schemaTable: 'migrations'
});
exports.postgrator = postgrator;

exports.migrate = function () {
  return postgrator.migrate();
};