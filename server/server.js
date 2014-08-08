// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    server = module.exports = express();

// SERVER CONFIGURATION
// ====================
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

server.use(express.static(__dirname + '/../public'));
server.use(bodyParser());
server.use(methodOverride());
server.use(errorHandler);

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port);

console.log('http://localhost:' + port + ' to start.');
