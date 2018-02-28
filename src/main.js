tablero = new Tablero($('#tablero'));

$('#myModal').modal();

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

tablero.setTurno(PARAMETROS.BLANCA);

// va a mostrar los usuarios conectados en una lista html
function mostrar_usuarios(usuarios) {

	var usuarios_conectados_html = $('#input_usuarios_conectados');
	usuarios_conectados_html.html('');
	for (var i = usuarios.length - 1; i >= 0; i--) {
		var option = '<option value="' + usuarios[i] + '">' + usuarios[i] + '</option>';
		usuarios_conectados_html.append(option);
	}
}

function mostrar_solicitudes(solicitudes) {

	var solicitudes_html = $('#solicitudes_partidas');
	solicitudes_html.html('');
	for (var i = solicitudes.length - 1; i >= 0; i--) {
		var li = '<li class="solicitud_seleccionada" value="' + solicitudes[i] + '">' + solicitudes[i] + '</li>';
		usuarios_conectados_html.append(li);
	}
}

$(document).on('click', '.solicitud_seleccionada', function(e) {
	e.preventDefault();
	confirmar_solicitud($(this).val());
	return false;
});

$(document).ready(function() {
	conectar();
});