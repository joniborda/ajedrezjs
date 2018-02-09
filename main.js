tablero = new Tablero($('#tablero'));
tablero.iniciar();

var caballo = tablero.fichas[1][0];
var posiciones_recorridas = [];
for (var i = 0; i < 8; i++) {
	posiciones_recorridas[i] = [];
}
/*
setInterval(function() {
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (posiciones_recorridas[i][j]) {
				continue;
			}
			if (caballo.mover(i, j)) {
				posiciones_recorridas[i][j] = true;
				return;
			}
		}
	}
}, 500);
*/

// esto tiene que estar afuera porque sino no tiene la intancia
for (var j = 0; j < 8; j++) {
	for (var i = 0; i < 8; i++) {
		tablero.casillas[j][i].droppable({
			drop: function( event, ui ) {

				if ($(ui).length) {
					if (tablero.mover(
						parseInt(ui.draggable.attr('x')), 
						parseInt(ui.draggable.attr('y')), 
						parseInt($(this).attr('x')), 
						parseInt($(this).attr('y'))
					)) {
					}
				}
			}
		});
	}
}

// esto tiene que estar afuera porque sino no tiene la intancia
for (var j = 0; j < 8; j++) {
	for (var i = 0; i < 8; i++) {
		if (tablero.fichas[j][i]) {
			$(tablero.fichas[j][i].ficha).draggable({
				containment: tablero.tablero,
				start: function(event, ui) {
					if (tablero.fichas[parseInt($(this).attr('x'))][parseInt($(this).attr('y'))].color == tablero.jugadores[tablero.turno].color) {
						for (var o = 0; o < 8; o++) {
							for (var p = 0; p < 8; p++) {
								if (tablero.fichas[parseInt($(this).attr('x'))][parseInt($(this).attr('y'))].habilitadaMover(o, p)) {
									tablero.casillas[o][p].append('<div class="casilla_habilitada"><div>');
								}
							}
						}
					}
		  		},
		  		stop: function(event, ui) {
		  			tablero.tablero.find('.casilla_habilitada').remove();
		  		}
			});
		}
	}
}

tablero.setTurno(BLANCA);