function Caballo(tablero, casillas, x, y, color) {
	this.ficha = $('<div class="pieza glyphicon glyphicon-knight"></div>');
	Ficha.call(this, tablero, casillas, x, y);
	this.nombre = 'Caballo';
	this.setPosition(x, y);
	this.setColor(color);
};
Caballo.prototype = Object.create(Ficha.prototype);

Caballo.prototype.puedeMover = function(x, y) {

	// si hay dos vertical tiene que haber uno horizontal
	if (Math.abs(this.y - y) === 2 && Math.abs(this.x - x) === 1) {
		return true;
	}

	// si hay dos horizantal tiene que haber uno vertical
	if (Math.abs(this.y - y) === 1 && Math.abs(this.x - x) === 2) {
		return true;
	}

	console.log('no puede mover asi el caballo');
	return false;
}