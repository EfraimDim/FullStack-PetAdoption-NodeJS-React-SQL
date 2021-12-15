"use strict";

var app = require('./app');

var _require = require('./lib/mysql'),
    postgrator = _require.postgrator;

var port = process.env.PORT || 5000;
var webSocketsServerPort = 8000;

var webSocketServer = require('websocket').server;

var http = require('http');

var server = http.createServer();
server.listen(webSocketsServerPort);
var wsServer = new webSocketServer({
  httpServer: server
});
postgrator.migrate().then(function (result) {
  console.log("migrated succesfully!", result);
  app.listen(port, function () {
    console.log("Listening on port ".concat(port, "..."));
  });
})["catch"](function (error) {
  return console.error(error);
});