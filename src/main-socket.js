var socket = null;

var data_socket = {
	socket_id: null,
	username: null
};
function conectar() {
	socket = io.connect('http://localhost:5000');
	cargar_escuchadores();
}

function nueva_partida(mi_usuario, contrincante, mi_color) {
	socket.emit('add_user', mi_usuario);
	// las partidas puede ser con un usuario elegido a sin usuario, esperando que alguien se una
	socket.emit('nueva_partida', contrincante, mi_color);
}

function cargar_escuchadores() {
	socket.on('connect', function() {
	});

	socket.on('usuarios_conectados', function(data) {
		mostrar_usuarios(data);
	});

	socket.on('added_user', function(socket_id) {
		data_socket.socket_id = socket_id;
	});

	socket.on('mis_solicitudes_partida', function(solicitudes) {
		cargar_solicitudes(solicitudes);
	});

	socket.on('enviar_solicitud', function(data) {
		contrincante = data.name;
		color = data.color;
	});

	socket.on('confirma_mi_partida', function(data) {
		contrincante = data.name;
		color = data.color;
	});

}
var para = require("parametros");