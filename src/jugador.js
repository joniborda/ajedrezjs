function Jugador(socket_id, username, color) {
	this.socket_id = socket_id;
	this.username = username;
	this.color = color;
}

Jugador.prototype.setUsername = function(username) {
	this.username = username;
}

Jugador.prototype.getUsername = function(username) {
	return this.username;
}

Jugador.prototype.setSocketId = function(socket_id) {
	this.socket_id = socket_id;
}

Jugador.prototype.getSocketId = function(socket_id) {
	return this.socket_id;
}

Jugador.prototype.setColor = function(color) {
	this.color = color;
}

Jugador.prototype.getColor = function(color) {
	return this.color;
}

//Jugador.prototype.setId = function(id) {