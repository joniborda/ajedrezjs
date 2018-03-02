var socket = null;

var data_socket = {
	socket_id: null,
	username: null
};
function conectar() {
	socket = io.connect('http://localhost:5000');
	cargar_escuchadores();
}

function agregar_usuario(mi_usuario) {
	socket.emit('add_user', mi_usuario);
	data_socket.username = mi_usuario;
}

function crear_partida(contrincante, mi_color) {
	// las partidas puede ser con un usuario elegido a sin usuario, esperando que alguien se una
	socket.emit('crear_partida', contrincante, mi_color);
}

function confirmar_solicitud(contrincante_socket_id, contrincante, socket_id, username) {
	socket.emit('confirmar_solicitud', contrincante_socket_id, contrincante, socket_id, username);
	
	solicitud_confirmada(socket_id, username, contrincante_socket_id, contrincante);
}

function enviar_movimiento(x1, y1, x2, y2) {
	socket.emit('enviar_movimiento', data_socket.contrincante_socket_id, x1, y1, x2, y2);
}

function cargar_escuchadores() {
	socket.on('connect', function() {
	});

	socket.on('usuarios_conectados', function(data) {
		mostrar_usuarios(data);
	});

	// sucede cuando agregaste tu usuario al servidor
	socket.on('added_user', function(socket_id) {
		data_socket.socket_id = socket_id;
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

	socket.on('solicitud_confirmada', function(socket_id, username, contrincante_socket_id, contrincante) {
		solicitud_confirmada(socket_id, username, contrincante_socket_id, contrincante);
	});

	
/*
	socket.on('confirma_mi_partida', function(data) {
		contrincante = data.name;
		color = data.color;
	});
*/

}