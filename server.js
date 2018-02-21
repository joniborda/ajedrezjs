var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server, { ws: true}), 
    usernames = {},
    parametros = require('./public/parametros.js');
console.log(parametros.port);

server.listen(parametros.port, function() {  
    console.log('Servidor corriendo en http://localhost:' + parametros.port);
});

app.use(express.static('public'));

var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 5001 });

wss.on('connection', function(socket) {
    console.log('alguien se conecto');

    //wss.emit('update_rooms', rooms);

    socket.on('add_user', function(username) {
        socket.username = username;

        socket.emit('added_user', socket.id);
    });

    socket.on('movimiento', function(data) {
    });

    //cuando un usuario se desconecta
    socket.on('disconnect', function() {

    });
});