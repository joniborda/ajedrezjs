function Alfil(tablero, fichas, x, y, color) {
	this.ficha = $('<div class="pieza"><i class="fas fa-chess-bishop"></i></div>');
	Ficha.call(this, tablero, fichas, x, y);
	this.nombre = PARAMETROS.ALFIL;
	this.setPosition(x, y);
	this.setColor(color);
};
Alfil.prototype = Object.create(Ficha.prototype);

Alfil.prototype.puedeMover = function(x, y) {

	if (this.nadieDiagonal(x, y)) {
		return true;
	}

	return false;
}