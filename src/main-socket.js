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

function confirmar_solicitud(socket_id, contrincante) {
	socket.emit('confirmar_solicitud', socket_id, contrincante);
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

	socket.on('mis_solicitudes_partida', function(solicitudes) {
		cargar_solicitudes(solicitudes);
	});

	// sucede cuando el servidor te manda una solicitud
	socket.on('enviar_solicitud', function(data) {
		console.log(data);
		PARAMETROS.SOLICITUDES.push(data);
		mostrar_solicitudes();
	});

	socket.on('solicitud_confirmada', function(socket_id, contrincante) {
		solicitud_confirmada();
	});

	
/*
	socket.on('confirma_mi_partida', function(data) {
		contrincante = data.name;
		color = data.color;
	});
*/

}