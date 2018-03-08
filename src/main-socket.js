var socket = null;

function conectar() {
	socket = io.connect('http://localhost:5000');
	cargar_escuchadores();
}

function agregar_usuario(mi_usuario) {
	socket.emit('add_user', mi_usuario);
	mi_jugador.setUsername(mi_usuario);
}

// las partidas puede ser con un usuario elegido o sin usuario, esperando que alguien se una
function crear_partida(contrincante, mi_color) {
	socket.emit('crear_partida', contrincante, mi_color);
	mi_jugador.setColor(mi_color);
}

/*
*	Es una solicitud del contrincante que la confirmo yo
*/
function confirmar_solicitud(contrincante_socket_id, contrincante, contrincante_color, socket_id, username, mi_color) {
	socket.emit('confirmar_solicitud', contrincante_socket_id, contrincante, contrincante_color, socket_id, username, mi_color);
	
	contrincante_jugador.setSocketId(contrincante_socket_id);
	contrincante_jugador.setUsername(contrincante);
	contrincante_jugador.setColor(contrincante_color);

	main_iniciar_juego();
}

function enviar_movimiento(x1, y1, x2, y2) {
	socket.emit('enviar_movimiento', contrincante_jugador.getSocketId(), x1, y1, x2, y2);
}

function cargar_escuchadores() {
	socket.on('connect', function() {
	});

	socket.on('usuarios_conectados', function(data) {
		mostrar_usuarios(data);
	});

	// sucede cuando agregaste tu usuario al servidor
	socket.on('added_user', function(socket_id) {
		mi_jugador.setSocketId(socket_id);
		mostrar_form_nueva_partida();
	});

	// sucede cuando el servidor te manda una solicitud
	socket.on('enviar_solicitud', function(data) {
		PARAMETROS.SOLICITUDES.push(data);
		mostrar_solicitudes();
	});

	socket.on('movimiento', function(socket_id, x1, y1, x2, y2) {
		tablero.mover(x1, y1, x2, y2);
	});

	socket.on('solicitud_confirmada', function(socket_id, username, mi_color, contrincante_socket_id, contrincante, contrincante_color) {
		contrincante_jugador.setSocketId(contrincante_socket_id);
		contrincante_jugador.setUsername(contrincante);
		contrincante_jugador.setColor(contrincante_color);

		main_iniciar_juego();
	});
}
