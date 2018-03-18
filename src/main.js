var tablero = new Tablero($('#tablero'));
var mi_jugador = new Jugador();
var contrincante_jugador = new Jugador();

var FORM_NUEVO_USUARIO = '#form_nuevo_usuario';
var INPUT_USUARIOS_CONECTADOS = '#input_usuarios_conectados';
var MY_MODAL = '#myModal';
var SOLICITUDES_PARTIDAS = '.solicitudes_partidas';
var SOLICITUD_SELECCIONADA = 'solicitud_seleccionada';
var FORM_NUEVA_PARTIDA = '#form_nueva_partida';

function main_iniciar_juego() {

	tablero.iniciar();

	tablero.setTurno(PARAMETROS.BLANCA);
	$(MY_MODAL).modal('hide');
}

// va a mostrar los usuarios conectados en una lista html
function mostrar_usuarios(usuarios) {
	var usuarios_conectados_html = $(INPUT_USUARIOS_CONECTADOS);
	usuarios_conectados_html.html('');
	for (var i in usuarios) {
		if (usuarios[i].username !== mi_jugador.getUsername()) {
			var option = '<option value="' + usuarios[i].username + '">' + usuarios[i].username + '</option>';
			usuarios_conectados_html.append(option);
		}
	}
}

function mostrar_solicitudes() {
	var solicitudes_html = $(SOLICITUDES_PARTIDAS);
	solicitudes_html.html('');
	for (var i = PARAMETROS.SOLICITUDES.length - 1; i >= 0; i--) {

		var solicitud_usuario = PARAMETROS.SOLICITUDES[i].usuario;
		var contrincante_socket_id = PARAMETROS.SOLICITUDES[i].usuario_socket_id;
		var contrincante_color = PARAMETROS.SOLICITUDES[i].mi_color;

		if (PARAMETROS.SOLICITUDES[i].usuario == mi_jugador.getUsername()) {
			solicitud_usuario = PARAMETROS.SOLICITUDES[i].contrincante;
			contrincante_socket_id = PARAMETROS.SOLICITUDES[i].contrincante_socket_id;
			contrincante_color = PARAMETROS.SOLICITUDES[i].contrincante_color;
		}
		var class_color = '';
		if (contrincante_color == PARAMETROS.BLANCA) {
			class_color = ' white';
		}
		var row = 
		'<tr>' + 
			'<td>' +
				'<a href="#" class="' + SOLICITUD_SELECCIONADA + '" ' +
					'contrincante_socket_id="' + contrincante_socket_id + '" ' +
					'contrincante="' + solicitud_usuario + '" ' +
					'contrincante_color="' + contrincante_color +'" >' +
					'Jugar' +
				'</a>' +
			'</td>' +
			'<td>' +
				solicitud_usuario + 
			'</td>' +
			'<td>' +
				'<span class="fas fa-chess-pawn ' + class_color + '">' +
				'</span>' +
			'</td>' +
		'</tr>';
		solicitudes_html.append(row);
	}
}

function mostrar_form_nueva_partida() {
	$(FORM_NUEVO_USUARIO).hide();
	$(FORM_NUEVA_PARTIDA).removeClass('ocultar').show();
	ocultar_cargando();
}

function mostrar_cargando() {
	$(
		'<div id="dialog_loading">' +
			'<img src="/img/loading.gif" />' +
		'</div>'
	).dialog({
		modal: true
	});
	$('#dialog_loading').closest('.ui-dialog').find('.ui-dialog-titlebar').remove();
	
}

function ocultar_cargando() {
	$('#dialog_loading').remove();
}

$(document).on('click', '.' + SOLICITUD_SELECCIONADA, function(e) {
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

$(document).on('submit', FORM_NUEVO_USUARIO, function(e) {
	e.preventDefault();
	mostrar_cargando();
	agregar_usuario($(this).find('.input_mi_usuario').val());
	return false;
});

$(document).on('submit', FORM_NUEVA_PARTIDA, function(e) {
	e.preventDefault();
	crear_partida($(this).find(INPUT_USUARIOS_CONECTADOS).val(), $(this).find('[name="input_color"]:checked').val());
	
	return false;
});

$(document).ready(function() {
	$(MY_MODAL).modal();
	conectar();
});