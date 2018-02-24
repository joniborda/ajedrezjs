tablero = new Tablero($('#tablero'));
tablero.iniciar();

var caballo = tablero.fichas[1][0];
var posiciones_recorridas = [];
for (var i = 0; i < 8; i++) {
	posiciones_recorridas[i] = [];
}

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
			$(tablero.fichas[j][i].ficha).click(function(e) {
	  			tablero.tablero.find('.casilla_habilitada').remove();
				if (tablero.fichas[parseInt($(this).attr('x'))][parseInt($(this).attr('y'))].color == tablero.jugadores[tablero.turno].color) {
					for (var o = 0; o < 8; o++) {
						for (var p = 0; p < 8; p++) {
							if (tablero.fichas[parseInt($(this).attr('x'))][parseInt($(this).attr('y'))].habilitadaMover(o, p)) {
								if (tablero.casillas[o][p].find('.casilla_habilitada').length === 0) {
									tablero.casillas[o][p].append('<div class="casilla_habilitada"><div>');
								}
							}
						}
					}
				}
			});

			$(tablero.fichas[j][i].ficha).draggable({
				containment: tablero.tablero,
				start: function(event, ui) {
					tablero.tablero.find('.casilla_habilitada').remove();
					if (tablero.fichas[parseInt($(this).attr('x'))][parseInt($(this).attr('y'))] && tablero.fichas[parseInt($(this).attr('x'))][parseInt($(this).attr('y'))].color == tablero.jugadores[tablero.turno].color) {
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
console.log(PARAMETROS);
tablero.setTurno(PARAMETROS.BLANCA);