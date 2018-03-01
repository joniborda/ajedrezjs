var PARAMETROS = require('parametros');

function Tablero(tablero) {
	this.tablero = tablero;
	this.fichas = [];
	this.casillas = [];
	// reloj deberia se una clase
	this.reloj = new Reloj(15, 0);

	var casilla = null;

	for (var j = 0; j < 8; j++) {
		this.fichas[j] = [];
		this.casillas[j] = [];
		for (var i = 0; i < 8; i++) {
			this.casillas[j][i] = null;
			this.fichas[j][i] = null;
		}
	}

	for (var j = 0; j < 8; j++) {
		for (var i = 0; i < 8; i++) {
			casilla = $('.casilla:first').clone().removeClass('ocultar');
			if ((i+j)%2) {
				casilla.addClass('white');
			}

			casilla.attr('x', i);
			casilla.attr('y', j);

			tablero.append(casilla);
			this.casillas[i][j] = casilla;
		}
	}

	// esto deberia estar en la clase game
	this.turno = null;
	this.jugadores = [];
};

Tablero.prototype.iniciar = function() {
	
	this.setTurno(PARAMETROS.BLANCA);

	var pieza = null;
	for (var i = 0; i < 8; i++) {
		pieza = new Peon(this.tablero, this.fichas, i, 1, PARAMETROS.BLANCA);
	}

	pieza = new Torre(this.tablero, this.fichas, 0, 0, PARAMETROS.BLANCA);
	pieza = new Caballo(this.tablero, this.fichas, 1, 0, PARAMETROS.BLANCA);
	pieza = new Alfil(this.tablero, this.fichas, 2, 0, PARAMETROS.BLANCA);
	pieza = new Rey(this.tablero, this.fichas, 3, 0, PARAMETROS.BLANCA);
	pieza = new Reina(this.tablero, this.fichas, 4, 0, PARAMETROS.BLANCA);
	pieza = new Alfil(this.tablero, this.fichas, 5, 0, PARAMETROS.BLANCA);
	pieza = new Caballo(this.tablero, this.fichas, 6, 0, PARAMETROS.BLANCA);
	pieza = new Torre(this.tablero, this.fichas, 7, 0, PARAMETROS.BLANCA);

	for (var i = 0; i < 8; i++) {
		pieza = new Peon(this.tablero, this.fichas, i, 6, PARAMETROS.NEGRA);
	}

	pieza = new Torre(this.tablero, this.fichas, 0, 7, PARAMETROS.NEGRA);
	pieza = new Caballo(this.tablero, this.fichas, 1, 7, PARAMETROS.NEGRA);
	pieza = new Alfil(this.tablero, this.fichas, 2, 7, PARAMETROS.NEGRA);
	pieza = new Rey(this.tablero, this.fichas, 3, 7, PARAMETROS.NEGRA);
	pieza = new Reina(this.tablero, this.fichas, 4, 7, PARAMETROS.NEGRA);
	pieza = new Alfil(this.tablero, this.fichas, 5, 7, PARAMETROS.NEGRA);
	pieza = new Caballo(this.tablero, this.fichas, 6, 7, PARAMETROS.NEGRA);
	pieza = new Torre(this.tablero, this.fichas, 7, 7, PARAMETROS.NEGRA);

	this.jugadores[0] = new Jugador(0, PARAMETROS.BLANCA);
	this.jugadores[1] = new Jugador(1, PARAMETROS.NEGRA);
}

Tablero.prototype.mover = function(x1, y1, x2, y2) {
	if (this.fichas[x1][y1]) {
		if (this.fichas[x1][y1].mover(x2,y2)) {
			if (this.turno == PARAMETROS.BLANCA) {
				this.setTurno(PARAMETROS.NEGRA);
			} else {
				this.setTurno(PARAMETROS.BLANCA);
			}

			return true;
		}
	} else {
		// mostrar mensaje de que no hay pieza en esa posicion
	}
	return false;
}

Tablero.prototype.setTurno = function(turno) {
	this.turno = turno;
	if (turno == PARAMETROS.BLANCA) {
		$('.turno_pieza').css('color', 'white');

	} else {
		$('.turno_pieza').css('color', 'black');
	}

	this.reloj.setTurno(turno);
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (this.fichas[i][j]) {
				if (this.fichas[i][j].color == this.turno) {
					this.fichas[i][j].ficha.draggable('enable');
				} else {
					this.fichas[i][j].ficha.draggable('disable');
				}
			}

		}
	}
}