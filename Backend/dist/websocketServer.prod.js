"use strict";var express=require("express"),router=express.Router(),webSocketsServerPort=8e3,webSocketServer=require("websocket").server,http=require("http"),server=http.createServer();server.listen(webSocketsServerPort),console.log("listening on port 8000");var wsServer=new webSocketServer({httpServer:server});router.wsServer;var clients={},getUniqueID=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()};wsServer.on("request",function(e){var r=getUniqueID();console.log(new Date+" Recieved a new connection from origin "+e.origin+".");var t=e.accept(null,e.origin);clients[r]=t,console.log("connected: "+r+" in "+Object.getOwnPropertyNames(clients)),t.on("message",function(e){"utf8"===e.type&&console.log("Received Message: ",e.utf8Data)})});