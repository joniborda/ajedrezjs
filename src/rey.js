function Rey(tablero, fichas, x, y, color) {
	this.ficha = $('<div class="pieza"><i class="fas fa-chess-king"></i></div>');
	Ficha.call(this, tablero, fichas, x, y);
	this.nombre = PARAMETROS.REY;
	this.setPosition(x, y);
	this.setColor(color);
};
Rey.prototype = Object.create(Ficha.prototype);

Rey.prototype.puedeMover = function(x, y) {

	this.enroque = 0;
	if (this.movio === false) {
		if (this.y == y && Math.abs(this.x - x) == 2) {
			if (x == 1 || x == 5) {
				 // es 1 o 5
				// enroque izquierdo
				if (this.fichas[0][this.y] && this.fichas[0][this.y].movio === false && this.nadieHorizontal(x, y)) {
					if (this.fichas[0][this.y].nadieHorizontal(x, y)) {
						this.enroque = PARAMETROS.IZQUIERDA;
						return true;
					}
					// no puede hacer enroque a la izquierda
				}
				// enroque derecho
				if (this.fichas[7][this.y] && this.fichas[7][this.y].movio === false && this.nadieHorizontal(x, y)) {

					if (this.fichas[7][this.y].nadieHorizontal(x, y)) {
						this.enroque = PARAMETROS.DERECHA;
						return true;
					}
					// no puede hacer enroque a la izquierda
				}
			}
		}

	}

	// una position
	if (Math.abs(this.y - y) > 1 || Math.abs(this.x - x) > 1) {
		// no puede mover
		return false;
	}
	
	var tmp_x = this.x;
	var tmp_y = this.y;
	var tmp_ficha = this.fichas[x][y];
	
	this.fichas[this.x][this.y] = null;
	this.fichas[x][y] = this;
	this.fichas[x][y].setPosition(x, y);
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (this.fichas[i][j] && this.fichas[i][j].generaJaque() && this.fichas[i][j].color !== this.color) {
				this.fichas[x][y] = tmp_ficha;
				this.fichas[tmp_x][tmp_y] = this;
				this.fichas[tmp_x][tmp_y].setPosition(tmp_x, tmp_y);
				return false;
			}
		}
	}

	this.fichas[x][y] = tmp_ficha;
	this.fichas[tmp_x][tmp_y] = this;
	this.fichas[tmp_x][tmp_y].setPosition(tmp_x, tmp_y);

	return true;
}

Rey.prototype.enrocar = function(x, y) {

	this.setPosition(x, y);
	this.fichas[x][y] = this;

	// muevo la torre
	if (this.enroque == PARAMETROS.IZQUIERDA) {
		this.fichas[0][y].setPosition(x+1, y);
		this.fichas[0][y] = this.fichas[x+1][y];
		this.fichas[0][y] = null;
	}

	if (this.enroque == PARAMETROS.DERECHA) {
		this.fichas[7][y].setPosition(x-1, y);
		this.fichas[7][y] = this.fichas[x-1][y];
		this.fichas[7][y] = null;
	}

	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (this.fichas[i][j] && this.fichas[i][j].generaJaque()) {
				alert('jaque');
			}
		}
	}
}
