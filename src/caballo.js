function Caballo(tablero, fichas, x, y, color) {
	this.ficha = $('<div class="pieza"><i class="fas fa-chess-knight"></i></div>');
	Ficha.call(this, tablero, fichas, x, y);
	this.nombre = PARAMETROS.CABALLO;
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

	return false;
}