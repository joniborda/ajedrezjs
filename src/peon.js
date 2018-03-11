function Peon(tablero, fichas, x, y, color) {
	this.alpaso = false; // campo para saber si se puede comer al paso
	this.ficha = $('<div class="pieza"><i class="fas fa-chess-pawn"></i></div>');
	Ficha.call(this, tablero, fichas, x, y);
	this.nombre = PARAMETROS.PEON;
	this.setPosition(x, y);
	this.setColor(color);
};
Peon.prototype = Object.create(Ficha.prototype);

Peon.prototype.puedeMover = function(x, y) {

	this.alpaso = false;

	// primer movimiento puede ser de a 2
	if (this.movio === false && Math.abs(this.y - y) === 2 && this.x - x === 0 && 
		(typeof this.fichas[x][y] == "undefined" || this.fichas[x][y] == null)
	) {
		console.log(this.fichas[x][y]);
		this.alpaso = true;
		return true;
	}


	if (Math.abs(this.y - y) !== 1) {
		// no puede mover
		return false;
	}

	// una position en vertical
	if (this.position == PARAMETROS.ABAJO && this.y - y == -1) {
		// no puede mover para atras
		return false;
	}

	if (this.position == PARAMETROS.ARRIBA && this.y - y == 1) {
		// no puede mover para atras
		return false;
	}

	// si mueve uno
	if (Math.abs(this.y - y) === 1 && this.x - x === 0) {
		if (this.fichas[x][y]) {
			if (this.fichas[x][y].color !== this.color) {
				// no puede comer en vertical
				return false;
			}
		}
		return true;
	}

	// si hay una pieza y en x solo hay uno de diferencia puede comer
	if (
		Math.abs(this.y - y) === 1 && Math.abs(this.x - x) === 1 && 
		this.fichas[x] && this.fichas[x][y]
	) {
		return true;
	} else {
		// no puede mover en diagonal sin comer
		return false;
	}
}
