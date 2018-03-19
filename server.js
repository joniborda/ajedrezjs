var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server, { ws: true}), 
    usuarios_conectados = [],
    parametros = require('./src/parametros.js'),
    clientes = [];

server.listen(process.env.PORT || 5000, function() {  
    console.log('Servidor corriendo en http://localhost:' + process.env.PORT || 5000);
});

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/static/fontawesome/', express.static(__dirname + '/src/fontawesome/svg-with-js/js'));
app.use('/static/jquery/', express.static(__dirname + '/src/jquery-ui-1.12.1.custom'));

io.on('connection', function(socket) {
    clientes[socket.id] = socket;

    socket.on('add_user', function(username) {
        socket.username = username;
        var data = {
            socket_id: socket.id,
            username: username
        };
        console.log('username ' + username);
        
        usuarios_conectados.push(data);
        socket.emit('added_user', socket.id);

        for (var i in clientes) {
            clientes[i].emit('usuarios_conectados', usuarios_conectados);
        }
    });

	socket.on('crear_partida', function(contrincante, mi_color) {
        var indice_contrincante = false;
        for (var i in usuarios_conectados) {
            if (usuarios_conectados[i].username == contrincante) {
                indice_contrincante = i;
                break;
            }
        };
		if (indice_contrincante === false) {
			console.log('usuario se fue');
			return;
		}

        socket.mi_color = parseInt(mi_color, 10);
		var data = {
            usuario_socket_id: socket.id,
            usuario: socket.username,
			mi_color: socket.mi_color,
            contrincante: contrincante,
            contrincante_socket_id: usuarios_conectados[indice_contrincante].socket_id,
            contrincante_color: (socket.mi_color == parametros.BLANCA ? parametros.NEGRA : parametros.BLANCA)
		}

		clientes[usuarios_conectados[indice_contrincante].socket_id].emit('enviar_solicitud', data);
    });

    socket.on('confirmar_solicitud', function(contrincante_socket_id, contrincante, contrincante_color, 
    	socket_id, username, mi_color) {
        clientes[contrincante_socket_id].emit('solicitud_confirmada', contrincante_socket_id, 
        	contrincante, contrincante_color, socket_id, username, mi_color);
    });

    socket.on('enviar_movimiento', function(socket_id, x1, y1, x2, y2) {
        if (clientes[socket_id]) {
            clientes[socket_id].emit('movimiento', socket_id, x1, y1, x2, y2);
        }
    });

    //cuando un usuario se desconecta
    socket.on('disconnect', function() {
        clientes.splice(socket.id, 1);

        for (var i in usuarios_conectados) {
            if (usuarios_conectados[i].socket_id == socket.id) {
                usuarios_conectados.splice(i, 1);
                break;
            }
        };

        for (var i in clientes) {
            clientes[i].emit('usuarios_conectados', usuarios_conectados);
        }
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
            './src/main-socket.js',
            './src/compu.js',
            './src/main.js',
        ]
    )
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/'));