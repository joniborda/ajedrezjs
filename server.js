var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server, { ws: true}), 
    usuarios_conectados = [],
    parametros = require('./src/parametros.js'),
    clientes = [];

server.listen(parametros.port, function() {  
    console.log('Servidor corriendo en http://localhost:' + parametros.port);
});

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/static/fontawesome/', express.static(__dirname + '/src/fontawesome/svg-with-js/js'));

io.on('connection', function(socket) {
    console.log('alguien se conecto');

    //io.emit('update_rooms', rooms);
    clientes[socket.id] = socket;

    socket.emit('usuarios_conectados', usuarios_conectados);

    socket.on('add_user', function(username) {
        socket.username = username;
        console.log('usuario agregado ' + username);
        usuarios_conectados.push(username);
        socket.emit('added_user', socket.id);
    });

	socket.on('nueva_solicitud', function(data) {
    	clientes[socket.id].emit('solitud_partida');
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