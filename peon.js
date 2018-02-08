function Peon(tablero, fichas, x, y, color) {
	this.alpaso = false; // campo para saber si se puede comer al paso
	this.ficha = $('<div class="pieza glyphicon glyphicon-pawn"></div>');
	Ficha.call(this, tablero, fichas, x, y);
	this.nombre = 'Peon';
	this.setPosition(x, y);
	this.setColor(color);
};
Peon.prototype = Object.create(Ficha.prototype);

Peon.prototype.puedeMover = function(x, y) {

	this.alpaso = false;

	// primer movimiento puede ser de a 2
	if (this.movio === false && Math.abs(this.y - y) === 2 && this.x - x === 0) {
		this.alpaso = true;
		return true;
	}


	if (Math.abs(this.y - y) !== 1) {
		console.log('no puede mover');
		return false;
	}

	// una position en vertical
	if (this.position == ABAJO && this.y - y == 1) {
		console.log('no puede mover para atras');
		return false;
	}

	if (this.position == ARRIBA && this.y - y == 1) {
		console.log('no puede mover para atras');
		return false;
	}

	// si mueve uno
	if (Math.abs(this.y - y) === 1 && this.x - x === 0) {
		return true;
	}

	// si hay una pieza y en x solo hay uno de diferencia puede comer
	if (
		Math.abs(this.y - y) === 1 && Math.abs(this.x - x) === 1 && 
		this.fichas[x] && this.fichas[x][y]
	) {
		return true;
	} else {
		console.log('no puede mover en diagonal sin comer');
		return false;
	}
}
