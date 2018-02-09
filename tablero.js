var dibujo_tablero = 
"00 01 02 03 04 05 06 07" +
"10 11 12 13 14 15 16 17" +
"20 21 22 23 24 25 26 27" +
"30 31 32 33 34 35 36 37" +
"40 41 42 43 44 45 46 47" +
"50 51 52 53 54 55 56 57" +
"60 61 62 63 64 65 66 67" +
"70 71 72 73 74 75 76 77"
;
const IZQUIERDA = 1;
const DERECHA = 2;
const BLANCA = 0;
const NEGRA = 1;
const ARRIBA = 1;
const ABAJO = 0;

function Tablero(tablero) {
	this.tablero = tablero;
	this.fichas = [];
	this.casillas = [];

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
	var pieza = null;
	for (var i = 0; i < 8; i++) {
		pieza = new Peon(this.tablero, this.fichas, i, 1, BLANCA);
	}

	pieza = new Torre(this.tablero, this.fichas, 0, 0, BLANCA);
	pieza = new Caballo(this.tablero, this.fichas, 1, 0, BLANCA);
	pieza = new Alfil(this.tablero, this.fichas, 2, 0, BLANCA);
	pieza = new Rey(this.tablero, this.fichas, 3, 0, BLANCA);
	pieza = new Reina(this.tablero, this.fichas, 4, 0, BLANCA);
	pieza = new Alfil(this.tablero, this.fichas, 5, 0, BLANCA);
	pieza = new Caballo(this.tablero, this.fichas, 6, 0, BLANCA);
	pieza = new Torre(this.tablero, this.fichas, 7, 0, BLANCA);

	for (var i = 0; i < 8; i++) {
		pieza = new Peon(this.tablero, this.fichas, i, 6, NEGRA);
	}

	pieza = new Torre(this.tablero, this.fichas, 0, 7, NEGRA);
	pieza = new Caballo(this.tablero, this.fichas, 1, 7, NEGRA);
	pieza = new Alfil(this.tablero, this.fichas, 2, 7, NEGRA);
	pieza = new Rey(this.tablero, this.fichas, 3, 7, NEGRA);
	pieza = new Reina(this.tablero, this.fichas, 4, 7, NEGRA);
	pieza = new Alfil(this.tablero, this.fichas, 5, 7, NEGRA);
	pieza = new Caballo(this.tablero, this.fichas, 6, 7, NEGRA);
	pieza = new Torre(this.tablero, this.fichas, 7, 7, NEGRA);

	this.jugadores[0] = new Jugador(0, BLANCA);
	this.jugadores[1] = new Jugador(1, NEGRA);
}

Tablero.prototype.mover = function(x1, y1, x2, y2) {
	if (this.fichas[x1][y1]) {
		if (this.fichas[x1][y1].mover(x2,y2)) {
			if (this.turno == BLANCA) {
				this.setTurno(NEGRA);
			} else {
				this.setTurno(BLANCA);
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