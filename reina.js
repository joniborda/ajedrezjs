function Reina(tablero, fichas, x, y, color) {
	this.ficha = $('<div class="pieza glyphicon glyphicon-queen"></div>');
	Ficha.call(this, tablero, fichas, x, y);
	this.nombre = 'Reina';
	this.setPosition(x, y);
	this.setColor(color);
};
Reina.prototype = Object.create(Ficha.prototype);

Reina.prototype.puedeMover = function(x, y) {

	if (this.x == x) {
		if (this.nadieVertical(x, y)) {
			return true;
		}
		// no puede mover asi la reina asi en vertical
		return false;
	}
	if (this.y == y) {
		if (this.nadieHorizontal(x, y)) {
			return true;
		}
		// no puede mover asi la reina asi en horizontal
		return false;
	}

	if (this.nadieDiagonal(x, y)) {
		return true;
	}
	
	return false;
}
