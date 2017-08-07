process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
    mongoose = require('./config/mongoose');
express = require('./config/express');
passport = require('./config/passport');
debug = require('debug')('school:server');
http = require('http');

var db = mongoose(),
    app = express(),
    passport = passport();
var socket = require('./app/routes/socket.server.routes.js');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(config.port);

io.sockets.on('connection', socket);

server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}
