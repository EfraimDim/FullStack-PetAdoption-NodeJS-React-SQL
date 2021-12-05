"use strict";

var mysql = require("mysql");

var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "sg35no4s",
  database: "pet-adoption"
});

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

module.exports = {
  query: query
};