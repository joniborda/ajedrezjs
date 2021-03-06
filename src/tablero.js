var PARAMETROS = require('parametros');
var TURNO_PIEZA = '.turno_pieza';
var CASILLA_HABILITADA = 'casilla_habilitada';

function Tablero(tablero) {
	this.tablero = tablero;
	this.fichas = [];
	this.casillas = [];

	this.reloj = new Reloj(10, 0);

	for (var j = 0; j < 8; j++) {
		this.casillas[j] = [];
	}
	
	var casilla = null;
	for (var j = 0; j < 8; j++) {
		this.fichas[j] = [];
		for (var i = 0; i < 8; i++) {
			casilla = $('.casilla:first').clone().removeClass('ocultar');

			if ((i+j)%2 == 0) {
				casilla.addClass('white');
			} else {
				casilla.removeClass('white');
			}

			casilla.attr('x', i);
			casilla.attr('y', j);

			tablero.append(casilla);
			this.casillas[i][j] = casilla;
			this.fichas[j][i] = null;
		}
	}

	// esto deberia estar en la clase game
	this.turno = null;
};

Tablero.prototype.iniciar = function() {

	var pieza = null;
	for (var i = 0; i < 8; i++) {
		pieza = new Peon(this.tablero, this.fichas, i, 1, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
	}

	pieza = new Torre(this.tablero, this.fichas, 0, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
	pieza = new Caballo(this.tablero, this.fichas, 1, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
	pieza = new Alfil(this.tablero, this.fichas, 2, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
	if (mi_jugador.isBlanco()) {
		pieza = new Rey(this.tablero, this.fichas, 4, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
		pieza = new Reina(this.tablero, this.fichas, 3, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
	} else {
		pieza = new Rey(this.tablero, this.fichas, 3, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
		pieza = new Reina(this.tablero, this.fichas, 4, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
	}
	pieza = new Alfil(this.tablero, this.fichas, 5, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
	pieza = new Caballo(this.tablero, this.fichas, 6, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);
	pieza = new Torre(this.tablero, this.fichas, 7, 0, mi_jugador.isBlanco() ? PARAMETROS.NEGRA : PARAMETROS.BLANCA);

	for (var i = 0; i < 8; i++) {
		pieza = new Peon(this.tablero, this.fichas, i, 6, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
	}

	pieza = new Torre(this.tablero, this.fichas, 0, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
	pieza = new Caballo(this.tablero, this.fichas, 1, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
	pieza = new Alfil(this.tablero, this.fichas, 2, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
	
	if (mi_jugador.isBlanco()) {
		pieza = new Rey(this.tablero, this.fichas, 4, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
		pieza = new Reina(this.tablero, this.fichas, 3, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
	} else {
		pieza = new Rey(this.tablero, this.fichas, 3, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
		pieza = new Reina(this.tablero, this.fichas, 4, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
	}
	
	pieza = new Alfil(this.tablero, this.fichas, 5, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
	pieza = new Caballo(this.tablero, this.fichas, 6, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);
	pieza = new Torre(this.tablero, this.fichas, 7, 7, mi_jugador.isBlanco() ? PARAMETROS.BLANCA : PARAMETROS.NEGRA);

	for (var j = 0; j < 8; j++) {
		for (var i = 0; i < 8; i++) {
			if (tablero.fichas[j][i]) {
				$(tablero.fichas[j][i].ficha).draggable({
					containment: tablero.tablero,
					start: function(event, ui) {
						tablero.tablero.find('.' + CASILLA_HABILITADA).remove();

						var x = parseInt($(this).attr('x'));
						var y = parseInt($(this).attr('y'));

						if (tablero.fichas[x][y] && tablero.fichas[x][y].color == tablero.turno) {
							for (var o = 0; o < 8; o++) {
								for (var p = 0; p < 8; p++) {
									if (tablero.fichas[x][y].habilitadaMover(o, p)) {
										tablero.casillas[o][p].append('<div class="' + CASILLA_HABILITADA + '"><div>');
									}
								}
							}
						}
			  		},
			  		stop: function(event, ui) {
			  			tablero.tablero.find('.' + CASILLA_HABILITADA).remove();
			  		}
				});

				$(tablero.fichas[j][i].ficha).click(function(e) {
		  			tablero.tablero.find('.' + CASILLA_HABILITADA).remove();
		  			var x = parseInt($(this).attr('x'));
		  			var y = parseInt($(this).attr('y'));

					if(
						(mi_jugador.getColor() !== null && tablero.fichas[x][y].color == tablero.turno && mi_jugador.getColor() == tablero.turno) ||
						(mi_jugador.getColor() === null && tablero.fichas[x][y].color == tablero.turno)
					) {
						for (var o = 0; o < 8; o++) {
							for (var p = 0; p < 8; p++) {
								if (tablero.fichas[x][y].habilitadaMover(o, p)) {
									if (tablero.casillas[o][p].find('.' + CASILLA_HABILITADA).length === 0) {
										tablero.casillas[o][p].append('<div class="' + CASILLA_HABILITADA + '"><div>');
									}
								}
							}
						}
					}

				});
			}

			tablero.casillas[j][i].droppable({
				drop: function( event, ui ) {

					if ($(ui).length) {
						var x1 = parseInt(ui.draggable.attr('x')),
							y1 = parseInt(ui.draggable.attr('y')),
							x2 = parseInt($(this).attr('x')),
							y2 = parseInt($(this).attr('y'));

						if (tablero.mover(x1, y1, x2, y2)) {
							if (contrincante_jugador.getUsername() == 'compu') {
								//tablero.setTurno(PARAMETROS.NEGRA);
							} else {
								//cuando enviio el movimiento lo envio alreves si es blanca el jugador
								if (mi_jugador.isBlanco()) {
									x1 = 7-x1;
									y1 = 7-y1;
									x2 = 7-x2;
									y2 = 7-y2;
								}
								enviar_movimiento(x1, y1, x2, y2);
							}
						}
					}
				}
			});
		}
	}
}

Tablero.prototype.mover = function(x1, y1, x2, y2) {
	if (this.fichas[x1] && this.fichas[x1][y1]) {
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
		$(TURNO_PIEZA).css('color', 'white');

	} else {
		$(TURNO_PIEZA).css('color', 'black');
	}

	this.reloj.setTurno(turno);
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (this.fichas[i][j]) {
				if (mi_jugador.getColor() !== null) {
					if(this.fichas[i][j].color == this.turno && mi_jugador.getColor() == this.turno) {
						this.fichas[i][j].ficha.draggable('enable');
					} else {
						this.fichas[i][j].ficha.draggable('disable');
					}
				} else {
					if (this.fichas[i][j].color == this.turno) {
						this.fichas[i][j].ficha.draggable('enable');
					} else {
						this.fichas[i][j].ficha.draggable('disable');
					}
				}

			}

		}
	}
}