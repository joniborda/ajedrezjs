var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server, { ws: true}), 
    usernames = {},
    parametros = require('./src/parametros.js');
console.log(parametros.port);

server.listen(parametros.port, function() {  
    console.log('Servidor corriendo en http://localhost:' + parametros.port);
});

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/static/fontawesome/', express.static(__dirname + '/src/fontawesome/svg-with-js/js'));

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

var gulp = require('gulp');
var concat = require('gulp-concat');

// TODO: esto debería ser una task para que no se haga cada vez que haga un start
gulp.src(
        [
            // se tienen que cargar en este orden
            './node_modules/jquery/dist/jquery.min.js',
            //'./node_modules/bootstrap/dist/css/*.min.css',
            './node_modules/bootstrap/dist/js/*.min.js',
            './src/jquery-ui-1.12.1.custom/jquery-ui.js',
            './src/bundle.js',
            './src/jugador.js',
            './src/ficha.js',
            './src/peon.js',
            './src/torre.js',
            './src/caballo.js',
            './src/alfil.js',
            './src/reina.js',
            './src/rey.js',
            './src/reloj.js',
            './src/tablero.js',
            './src/main.js',
            './src/main-socket.js',
        ]
    )
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/'));