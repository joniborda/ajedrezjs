function Reloj(minutos, segundos) {
	reloj_blanca = new Date();
	reloj_negra = new Date();
	this.reloj_intervalo = null;

	reloj_blanca.setHours(0);
	reloj_blanca.setMinutes(minutos);
	reloj_blanca.setSeconds(segundos);

	reloj_negra.setHours(0);
	reloj_negra.setMinutes(minutos);
	reloj_negra.setSeconds(segundos);
}

Reloj.prototype.parar = function() {
	clearInterval(this.reloj_intervalo);
}

Reloj.prototype.setTurno = function(turno) {
	clearInterval(this.reloj_intervalo);

	TURNO = turno;

	this.reloj_intervalo = setInterval(function() {
		if (TURNO == PARAMETROS.BLANCA) {
			reloj = reloj_blanca;
		} else {
			reloj = reloj_negra;
		}
		reloj.setMilliseconds(-1);
		var segundos = reloj.getSeconds();

		if (segundos < 10) {
			segundos = '0' + segundos;
		}

		if (TURNO == PARAMETROS.BLANCA) {
			$('.reloj_blanca').html(reloj.getMinutes() + ':' + segundos);
		} else {
			$('.reloj_negra').html(reloj.getMinutes() + ':' + segundos);
		}
	}, 1000);
}