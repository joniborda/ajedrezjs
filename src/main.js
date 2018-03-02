var tablero = null;
function main_iniciar_juego() {

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
						var x1 = parseInt(ui.draggable.attr('x')),
							y1 = parseInt(ui.draggable.attr('y')),
							x2 = parseInt($(this).attr('x')),
							y2 = parseInt($(this).attr('y'));

						if (tablero.mover(x1, y1, x2, y2)) {
							enviar_movimiento(x1, y1, x2, y2);
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
}

function habilitarMe() {
	for (var j = 0; j < 8; j++) {
		for (var i = 0; i < 8; i++) {
			if (tablero.fichas[j] && tablero.fichas[j][i] && tablero.fichas[j][i].ficha) {
				$(tablero.fichas[j][i].ficha).draggable('enable');
			}
		}
	}
}
function deshabilitarMe() {
	for (var j = 0; j < 8; j++) {
		for (var i = 0; i < 8; i++) {
			if (tablero.fichas[j] && tablero.fichas[j][i] && tablero.fichas[j][i].ficha) {
				$(tablero.fichas[j][i].ficha).draggable('disable');
			}
		}
	}
}

// va a mostrar los usuarios conectados en una lista html
function mostrar_usuarios(usuarios) {
	var usuarios_conectados_html = $('#input_usuarios_conectados');
	usuarios_conectados_html.html('');
	for (var i in usuarios) {
		if (usuarios[i].username !== data_socket.username) {
			var option = '<option value="' + usuarios[i].username + '">' + usuarios[i].username + '</option>';
			usuarios_conectados_html.append(option);
		}
	}
}

function mostrar_solicitudes() {

	var solicitudes_html = $('.solicitudes_partidas');
	solicitudes_html.html('');
	for (var i = PARAMETROS.SOLICITUDES.length - 1; i >= 0; i--) {

		var solicitud_usuario = PARAMETROS.SOLICITUDES[i].usuario;
		var contrincante_socket_id = PARAMETROS.SOLICITUDES[i].usuario_socket_id;

		if (PARAMETROS.SOLICITUDES[i].contrincante !== data_socket.username) {
			solicitud_usuario = PARAMETROS.SOLICITUDES[i].contrincante;
			contrincante_socket_id = PARAMETROS.SOLICITUDES[i].contrincante_socket_id;
		}

		var li = '<li ' +
			'class="solicitud_seleccionada" ' +
			'socket_id="' + contrincante_socket_id + '" ' +
			'contrincante="' + solicitud_usuario + '">' + 
			solicitud_usuario + 
			'</li>';
		solicitudes_html.append(li);
	}
}

function mostrar_form_nueva_partida() {
	$('#form_nuevo_usuario').hide();
	$('#form_nueva_partida').removeClass('ocultar').show();
}

function solicitud_confirmada(socket_id, username, contrincante_socket_id, contrincante) {
	$('#myModal').modal('hide');
	data_socket.contrincante = contrincante;
	data_socket.contrincante_socket_id = contrincante_socket_id;
	console.log('contrincante : ' + contrincante);
	main_iniciar_juego();
}

$(document).on('click', '.solicitud_seleccionada', function(e) {
	e.preventDefault();
	confirmar_solicitud($(this).attr('socket_id'), $(this).attr('contrincante'), data_socket.socket_id, data_socket.username);
	return false;
});

$(document).on('submit', '#form_nuevo_usuario', function(e) {
	e.preventDefault();
	agregar_usuario($(this).find('.input_mi_usuario').val());
	return false;
});

$(document).on('submit', '#form_nueva_partida', function(e) {
	e.preventDefault();
	crear_partida($(this).find('#input_usuarios_conectados').val(), PARAMETROS.BLANCA);
	return false;
});

$(document).ready(function() {
	$('#myModal').modal();
	conectar();
});