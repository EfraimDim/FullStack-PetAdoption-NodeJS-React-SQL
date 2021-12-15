const app = require('./app')

const {postgrator} = require('./lib/mysql')
const port = process.env.PORT || 5000;

const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});



postgrator.migrate().then((result )=>{
    console.log(`migrated succesfully!`, result)
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`)
    })})
    .catch((error)=>console.error(error));
