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
/*
				console.log("x1 " + ui.draggable.attr('x'));
				console.log("y1 " + ui.draggable.attr('y'));
				console.log("x2 " + $(this).attr('x'));
				console.log("y2 " + $(this).attr('y'));
*/
				if ($(ui).length) {
/*					console.log(tablero);*/
					tablero.mover(
						parseInt(ui.draggable.attr('x')), 
						parseInt(ui.draggable.attr('y')), 
						parseInt($(this).attr('x')), 
						parseInt($(this).attr('y'))
					);
				}
			}
		});
	}
}