function Reina(tablero, fichas, x, y, color) {
	this.ficha = $('<div class="pieza glyphicon glyphicon-queen"></div>');
	Ficha.call(this, tablero, fichas, x, y);
	this.nombre = 'Reina';
	this.setPosition(x, y);
	this.setColor(color);
};
Reina.prototype = Object.create(Ficha.prototype);

Reina.prototype.puedeMover = function(x, y) {

	if (this.nadieDiagonal(x, y)) {
		return true;
	}

	if (this.nadieVertical(x, y)) {
		return true;
	}

	if (this.nadieHorizontal(x, y)) {
		return true;
	}

	console.log('no puede mover asi el alfil');
	return false;
}