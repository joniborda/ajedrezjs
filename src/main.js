var tablero = null;
var mi_jugador = new Jugador();
var contrincante_jugador = new Jugador();
function main_iniciar_juego() {

	tablero = new Tablero($('#tablero'));

	tablero.iniciar();

	var caballo = tablero.fichas[1][0];
	var posiciones_recorridas = [];
	for (var i = 0; i < 8; i++) {
		posiciones_recorridas[i] = [];
	}

	tablero.setTurno(PARAMETROS.BLANCA);
	$('#myModal').modal('hide');
}

// va a mostrar los usuarios conectados en una lista html
function mostrar_usuarios(usuarios) {
	var usuarios_conectados_html = $('#input_usuarios_conectados');
	usuarios_conectados_html.html('');
	for (var i in usuarios) {
		if (usuarios[i].username !== mi_jugador.getUsername()) {
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
		var contrincante_color = PARAMETROS.SOLICITUDES[i].mi_color;

		if (PARAMETROS.SOLICITUDES[i].contrincante !== mi_jugador.getUsername()) {
			solicitud_usuario = PARAMETROS.SOLICITUDES[i].contrincante;
			contrincante_socket_id = PARAMETROS.SOLICITUDES[i].contrincante_socket_id;
			contrincante_color = PARAMETROS.SOLICITUDES[i].contrincante_color;
		}

		var li = '<li>' + 
			'<a href="#" class="solicitud_seleccionada" ' +
			'contrincante_socket_id="' + contrincante_socket_id + '" ' +
			'contrincante="' + solicitud_usuario + '" ' +
			'contrincante_color="' + contrincante_color +'" >' +
			solicitud_usuario + 
			'</a>' +
		'</li>';
		solicitudes_html.append(li);
	}
}

function mostrar_form_nueva_partida() {
	$('#form_nuevo_usuario').hide();
	$('#form_nueva_partida').removeClass('ocultar').show();
}

$(document).on('click', '.solicitud_seleccionada', function(e) {
	e.preventDefault();

	var contrincante_color = $(this).attr('contrincante_color');
	mi_jugador.setColor(PARAMETROS.BLANCA);

	if (parseInt(contrincante_color, 10) == PARAMETROS.BLANCA) {
		mi_jugador.setColor(PARAMETROS.NEGRA);
	}

	confirmar_solicitud(
		$(this).attr('contrincante_socket_id'), $(this).attr('contrincante'), 
		$(this).attr('contrincante_color'),
		mi_jugador.getSocketId(), mi_jugador.getUsername(), 
		mi_jugador.getColor()
	);
	return false;
});

$(document).on('submit', '#form_nuevo_usuario', function(e) {
	e.preventDefault();
	agregar_usuario($(this).find('.input_mi_usuario').val());
	return false;
});

$(document).on('submit', '#form_nueva_partida', function(e) {
	e.preventDefault();
	crear_partida($(this).find('#input_usuarios_conectados').val(), $(this).find('[name="input_color"]').val());

	
	return false;
});

$(document).ready(function() {
	$('#myModal').modal();
	conectar();
});