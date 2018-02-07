tablero = new Tablero($('#tablero'));
tablero.iniciar();

var caballo = tablero.casillas[1][0];
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