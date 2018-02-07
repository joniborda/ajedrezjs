function Tablero(tablero) {
	this.tablero = tablero;
	this.casillas = [];
	var casilla = null;
	for (var j = 0; j < 8; j++) {
		this.casillas[j] = [];
		for (var i = 0; i < 8; i++) {
			casilla = $('.casilla:first').clone().removeClass('ocultar');
			if ((i+j)%2) {
				casilla.addClass('white');
			}
			tablero.append(casilla);
		}
	}
};

Tablero.prototype.iniciar = function() {
	var pieza = null;
	for (var i = 0; i < 8; i++) {
		pieza = new Peon(this.tablero, this.casillas, i, 1, 'blanco');
	}

	pieza = new Torre(this.tablero, this.casillas, 0, 0, 'blanco');
	pieza = new Caballo(this.tablero, this.casillas, 1, 0, 'blanco');
	pieza = new Alfil(this.tablero, this.casillas, 2, 0, 'blanco');
	pieza = new Rey(this.tablero, this.casillas, 3, 0, 'blanco');
	pieza = new Reina(this.tablero, this.casillas, 4, 0, 'blanco');
	pieza = new Alfil(this.tablero, this.casillas, 5, 0, 'blanco');
	pieza = new Caballo(this.tablero, this.casillas, 6, 0, 'blanco');
	pieza = new Torre(this.tablero, this.casillas, 7, 0, 'blanco');

	for (var i = 0; i < 8; i++) {
		pieza = new Peon(this.tablero, this.casillas, i, 6, 'negro');
	}

	pieza = new Torre(this.tablero, this.casillas, 0, 7, 'negro');
	pieza = new Caballo(this.tablero, this.casillas, 1, 7, 'negro');
	pieza = new Alfil(this.tablero, this.casillas, 2, 7, 'negro');
	pieza = new Rey(this.tablero, this.casillas, 3, 7, 'negro');
	pieza = new Reina(this.tablero, this.casillas, 4, 7, 'negro');
	pieza = new Alfil(this.tablero, this.casillas, 5, 7, 'negro');
	pieza = new Caballo(this.tablero, this.casillas, 6, 7, 'negro');
	pieza = new Torre(this.tablero, this.casillas, 7, 7, 'negro');
}

Tablero.prototype.mover = function(x1, y1, x2, y2) {
	if (this.casillas[x1][y1]) {
		return this.casillas[x1][y1].mover(x2,y2);
	} else {
		// mostrar mensaje de que no hay pieza en esa posicion
	}
	return false;
}