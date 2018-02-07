function Rey(tablero, casillas, x, y, color) {
	this.ficha = $('<div class="pieza glyphicon glyphicon-king"></div>');
	Ficha.call(this, tablero, casillas, x, y);
	this.nombre = 'Rey';
	this.setPosition(x, y);
	this.setColor(color);
};
Rey.prototype = Object.create(Ficha.prototype);

Peon.prototype.puedeMover = function(x, y) {

	this.enroque = 0;
	if (this.movio === false) {
		// enroque izquierdo
		if (this.x - x == 2 && this.casillas[0][y].movio === false && this.nadieHorizontal(x, y)) {
			if (this.casillas[0][y].nadieHorizontal(x+1, y)) {
				this.enroque = IZQUIERDA;
				return true;
			}
			console.log('no puede hacer enroque a la izquierda');
		}

		// enroque derecho
		if (x - this.x == 2 && this.casillas[7][y].movio === false && this.nadieHorizontal(x, y)) {

			if (this.casillas[0][y].nadieHorizontal(x-1, y)) {
				this.enroque = DERECHA;
				return true;
			}
			console.log('no puede hacer enroque a la izquierda');
		}
	}

	// una position
	if (Math.abs(this.y - y) > 1 || Math.abs(this.x - x) > 1) {
		console.log('no puede mover');
		return false;
	}

	return true;
}

Peon.prototype.enrocar = function(x, y) {

	this.setPosition(x, y);
	this.casillas[x][y] = this;

	// muevo la torre
	if (this.enroque == IZQUIERDA) {
		this.casillas[0][y].setPosition(x+1, y);
		this.casillas[0][y] = this.casillas[x+1][y];
		this.casillas[0][y] = null;
	}

	if (this.enroque == DERECHA) {
		this.casillas[0][y].setPosition(x-1, y);
		this.casillas[0][y] = this.casillas[x-1][y];
		this.casillas[0][y] = null;
	}
}