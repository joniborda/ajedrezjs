var socket = null;

var data_socket = {
	socket_id: null,
	username: null
};
function conectar(username) {
	socket = io.connect('http://localhost:5000');
	cargar_escuchadores();
	socket.emit('add_user', username);
}

function nueva_solicitud(username) {
	socket.emit('nueva_solicitud', username);
}


function cargar_escuchadores() {
	socket.on('connect', function() {

	});

	socket.on('usuarios_conectados', function(data) {
		console.log(data);
		mostrarUsuario(data);
	});

	socket.on('added_user', function(socket_id) {
		data_socket.socket_id = socket_id;
	});

	socket.on('solicitud_partida', function(socket_id) {
		console.log('pidio');
	});
}
var para = require("parametros");