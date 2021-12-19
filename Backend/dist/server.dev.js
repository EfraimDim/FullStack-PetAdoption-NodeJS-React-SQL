"use strict";

var app = require('./app');

var _require = require('./lib/mysql'),
    postgrator = _require.postgrator;

var port = process.env.PORT || 5000;
postgrator.migrate().then(function (result) {
  console.log("migrated succesfully!", result);
  app.listen(port, function () {
    console.log("Listening on port ".concat(port, "..."));
  });
})["catch"](function (error) {
  return console.error(error);
});
var webSocketsServerPort = 8000;

var webSocketServer = require('websocket').server;

var http = require('http'); // Spinning the http server and the websocket server.


var server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000');
var wsServer = new webSocketServer({
  httpServer: server
});
var clients = {}; // This code generates unique userid for everyuser.

var getUniqueID = function getUniqueID() {
  var s4 = function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };

  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log(new Date() + ' Recieved a new connection from origin ' + request.origin + '.'); // You can rewrite this part of the code to accept only the requests from allowed origin

  var connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data); // broadcasting message to all connected clients

      for (key in clients) {
        clients[key].sendUTF(message.utf8Data);
        console.log('sent Message to: ', clients[key]);
      }
    }
  });
});