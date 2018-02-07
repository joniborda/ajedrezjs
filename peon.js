function Peon(tablero, casillas, x, y, color) {
	this.alpaso = false; // campo para saber si se puede comer al paso
	this.ficha = $('<div class="pieza glyphicon glyphicon-pawn"></div>');
	Ficha.call(this, tablero, casillas, x, y);
	this.nombre = 'Peon';
	this.setPosition(x, y);
	this.setColor(color);
};
Peon.prototype = Object.create(Ficha.prototype);

Peon.prototype.puedeMover = function(x, y) {

	// ver como saber cual es la posicion para adelante

	// primer movimiento puede ser de a 2
	if (this.movio === false && Math.abs(this.y - y) === 2 && this.x - x === 0) {
		this.alpaso = true;
		return true;
	}

	// una position en vertical
	if (Math.abs(this.y - y) !== 1) {
		console.log('no puede mover');
		return false;
	}

	if (this.x - x === 0) {
		this.alpaso = false;
		return true;
	}

	// si hay una pieza y en x solo hay uno de diferencia puede comer
	if (this.casillas[x] && this.casillas[x][y]) {
		this.alpaso = false;
		return true;
	} else {
		console.log('no puede mover sin comer');
		return false;
	}
}
