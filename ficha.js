function Ficha(tablero, fichas, x, y) {
	this.movio = false;
	this.fichas = fichas;
	this.fichas[x][y] = this;
	this.x = x;
	this.y = y;
	this.tablero = tablero;

	this.tablero.append(this.ficha);
}

/*
 * Setea la posicion (x,y)
 *
 */
Ficha.prototype.setPosition = function(x, y) {
	this.ficha.css('position', 'absolute');
	this.ficha.css('left', x * 40);
	this.ficha.css('top', y * 40);
	this.ficha.attr('x', x);
	this.ficha.attr('y', y);
	this.x = x;
	this.y = y;
}

/*
 * Setea el color de la ficha y la posicion para donde mueve
 *
 */
Ficha.prototype.setColor = function(color) {
	this.color = color;
	this.position = ARRIBA;
	if (color == BLANCA) {
		this.ficha.css('color', '#FFF');
	} else {
		this.position = ABAJO;
		this.ficha.css('color', '#000');
	}
}

/*
 * Mueve la ficha si es que se puede mover
 * Tambien valida si hay jaque o jaque mate
 */
Ficha.prototype.mover = function(x, y) {

	if (this.habilitadaMover(x, y)) {
		this.movio = true;
		this.fichas[this.x][this.y] = null;

		if (this.enroque) {
			this.enrocar(x, y);
		} else {
			if (this.fichas[x][y]) {
				//comio ' + this.fichas[x][y].nombre
				this.fichas[x][y].remover();
			}
			this.setPosition(x, y);
			this.fichas[x][y] = this;
			
		}

		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				if (this.fichas[i][j] && this.fichas[i][j].generaJaque()) {
					alert('jaque ' + COLORES[this.fichas[i][j].color]);
				}
			}
		}

		var pueden_mover = false;
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				for (var i2 = 0; i2 < 8; i2++) {
					for (var j2 = 0; j2 < 8; j2++) {
						if (this.fichas[i][j] && this.fichas[i][j].color != this.color && this.fichas[i][j].habilitadaMover(i2, j2)) {
							pueden_mover = true;
						}
					}
				}
			}
		}

		if (pueden_mover == false) {
			alert('jaque mate');
		}

		return true;
	}

	this.fichas[this.x][this.y].setPosition(this.x, this.y);
	return false;
}

/*
 * Elimina la ficha
 *
 */
Ficha.prototype.remover = function() {
	//this.ficha.remove();
	this.ficha.css('left', 'auto');
	this.ficha.css('top', 'auto');
	this.ficha.css('position', 'relative');
	if (this.color == BLANCA) {
		$('#blancas_comidas').append(this.ficha);
	} else {
		$('#negras_comidas').append(this.ficha);
	}
	// ver si las muestro al costado
}

/*
 * Devuelve true si no hay ninguna ficha en vertical hasta (x,y)
 *
 */
Ficha.prototype.nadieVertical = function(x, y) {
	// ver que no haya piezas en el medio
	if (this.y - y !== 0) {
		// arranco de this.y hasta y (sin las puntas)
		if (this.y - y < 0) {
			for(var i = this.y + 1; i < y; i++) {
				if (this.fichas[x][i]) {
					//no puede porque hay alguien en el medio en vertical
					return false;
				}
			}
			
		}

		// arranco de y hasta this.y (sin las puntas)
		if (this.y - y > 0) {
			for(var i = y + 1; i < this.y; i++) {
				if (this.fichas[x][i]) {
					//no puede porque hay alguien en el medio en vertical
					return false;
				}
			}
			
		}
	}
	return true;
}

/*
 * Devuelve true si no hay ninguna ficha en horizontal hasta (x,y)
 *
 */
Ficha.prototype.nadieHorizontal = function(x, y) {
	// ver que no haya piezas en el medio
	if (this.x - x !== 0) {
		// arranco de this.x hasta x (sin las puntas)
		if (this.x - x < 0) {
			for(var i = this.x + 1; i < x; i++) {
				if (this.fichas[i][y]) {
					//no puede porque hay alguien en el medio en horizontal
					return false;
				}
			}
			
		}

		// arranco de x hasta this.x (sin las puntas)
		if (this.x - x > 0) {
			for(var i = x + 1; i < this.x; i++) {
				if (this.fichas[i][y]) {
					//no puede porque hay alguien en el medio en horizontal
					return false;
				}
			}
			
		}
	}
	return true;
}

/*
 * Devuelve true si no hay ninguna ficha en diagonal hasta (x,y)
 *
 */
Ficha.prototype.nadieDiagonal = function(x, y) {
	// ver que no haya piezas en el medio
	if (this.x - x === 0  || this.y - y === 0) {
		//mueve en vertical ¿?
		return false;
	}

	// tiene que mover la misma distancia en verticual como en horizontal
	if (Math.abs(this.y - y) !== Math.abs(this.x - x)) {
		//no mueve la misma distancia
		return false;
	}

	// arranco de this.x hasta x (sin las puntas)
	if (this.x - x < 0) {
		if (this.y - y < 0) {
			for(var i = 1; i < x - this.x; i++) {
				if (this.fichas[this.x + i][this.y + i]) {
					//no puede porque hay alguien en el medio en diagonal para abajo derecha
					return false;
				}
			}
		} else {
			for(var i = 1; i < x - this.x; i++) {
				if (this.fichas[this.x + i][this.y - i]) {
					//no puede porque hay alguien en el medio en diagonal para arriba derecha
					return false;
				}
			}
		}
	}

	// arranco de x hasta this.x (sin las puntas)
	if (this.x - x > 0) {
		if (this.y - y < 0) {
			for(var i = 1; i < this.x -x; i++) {
				if (this.fichas[this.x - i][this.y + i]) {
					//no puede porque hay alguien en el medio en diagonal para abajo izquierda
					return false;
				}
			}
		} else {
			for(var i = 1; i < this.x -x; i++) {
				if (this.fichas[this.x - i][this.y - i]) {
					//no puede porque hay alguien en el medio en diagonal para arriba izquierda
					return false;
				}
			}
		}
	}

	return true;
}

/*
 * Devuelve true si la ficha puede mover
 *
 */
Ficha.prototype.habilitadaMover = function(x, y) {

	if (x < 0 || y < 0 || x > 7 || y > 7) {
		//se fue del tablero
		this.fichas[this.x][this.y].setPosition(this.x, this.y);
		return false;
	}

	if (this.fichas[x][y]) {
		if (this.fichas[x][y].color == this.color) {
			//no puede comer al del mismo color
			this.fichas[this.x][this.y].setPosition(this.x, this.y);
			return false;
		}
	}

	if (this.puedeMover(x, y)) {

		var tmp_x = this.x;
		var tmp_y = this.y;
		var tmp_ficha = this.fichas[x][y];
		
		this.fichas[this.x][this.y] = null;
		this.fichas[x][y] = this;
		this.fichas[x][y].setPosition(x, y);
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				if (this.fichas[i][j] && this.fichas[i][j].generaJaque() && this.fichas[i][j].color !== this.color) {
					this.fichas[x][y] = tmp_ficha;
					this.fichas[tmp_x][tmp_y] = this;
					this.fichas[tmp_x][tmp_y].setPosition(tmp_x, tmp_y);
					return false;
				}
			}
		}
		this.fichas[x][y] = tmp_ficha;
		this.fichas[tmp_x][tmp_y] = this;
		this.fichas[tmp_x][tmp_y].setPosition(tmp_x, tmp_y);

		return true;
	}
}

/*
 * Devuelve true si la ficha en this apunta en vertical al rey opuesto
 *
 */
Ficha.prototype.reyEnVertical = function(unMovimiento = false) {

	for(var i = this.y + 1; i < 8; i++) {
		if (this.fichas[this.x][i]) {
			if (this.fichas[this.x][i].color !== this.color && this.fichas[this.x][i].nombre == REY) {
				return true;
			}
			break;
		}
		if (unMovimiento) {
			break;
		}
	}

	for(var i = this.y - 1; i >= 0 ; i--) {
		if (this.fichas[this.x][i]) {
			if (this.fichas[this.x][i].color !== this.color && this.fichas[this.x][i].nombre == REY) {
				return true;
			}
			break;
		}

		if (unMovimiento) {
			break;
		}
	}
	return false;
}

/*
 * Devuelve true si la ficha en this apunta en diagonal al rey opuesto
 *
 */
Ficha.prototype.reyEnHorizontal = function(unMovimiento = false) {

	for(var i = this.x + 1; i < 8; i++) {
		if (this.fichas[i][this.y]) {
			if (this.fichas[i][this.y].color !== this.color && this.fichas[i][this.y].nombre == REY) {
				return true;
			}
			break;
		}
		if (unMovimiento) {
			break;
		}
	}

	for(var i = this.x - 1; i >= 0 ; i--) {
		if (this.fichas[i][this.y]) {
			if (this.fichas[i][this.y].color !== this.color && this.fichas[i][this.y].nombre == REY) {
				return true;
			}
			break;
		}
		if (unMovimiento) {
			break;
		}
	}
	return false;
}

/** unMovimiento es para saber que mueve solo un movimiento.
*	adelante es para saber que solo mueve para adelante.
*/
Ficha.prototype.reyEnDiagonal = function(unMovimiento = false, adelante = false) {

	// arranco izquierda arriba
	var x = this.x - 1;
	var y = this.y - 1;
	while(x >= 0 && y >= 0) {
		if (this.fichas[x][y]) {
			if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
				
				if (adelante) {
					if (this.position == ABAJO) {
						return true;
					}
				} else {
					return true;
				}
			}
			break;
		}
		
		if (unMovimiento) {
			break;
		}

		x--;
		y--;
	}

	// izquierda abajo
	x = this.x - 1;
	y = this.y + 1;
	while(x >= 0 && y < 8) {
		if (this.fichas[x][y]) {
			if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
				if (adelante) {
					if (this.position == ARRIBA) {
						return true;
					}
				} else {
					return true;
				}
			}
			break;
		}

		if (unMovimiento) {
			break;
		}
		x--;
		y++;
	}

	// derecha abajo
	x = this.x + 1;
	y = this.y + 1;
	while(x < 8 && y < 8) {
		if (this.fichas[x][y]) {
			if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
				if (adelante) {
					if (this.position == ARRIBA) {
						return true;
					}
				} else {
					return true;
				}
			}
			break;
		}
		if (unMovimiento) {
			break;
		}
		x++;
		y++;
	}

	// derecha arriba
	x = this.x + 1;
	y = this.y - 1;
	while(x < 8 && y >= 0) {
		if (this.fichas[x][y]) {
			if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
				if (adelante) {
					if (this.position == ABAJO) {
						return true;
					}
				} else {
					return true;
				}
			}
			break;
		}
		if (unMovimiento) {
			break;
		}
		x++;
		y--;
	}

	return false;
}

Ficha.prototype.reyEnEle = function() {
	// dos izquierda uno arriba
	var x = this.x - 2;
	var y = this.y - 1;

	if (x >= 0 && x < 8 && y >= 0 && y < 8 && this.fichas[x][y]) {
		if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
			return true;
		}
	}

	// dos izquierda uno abajo
	x = this.x - 2;
	y = this.y + 1;

	if (x >= 0 && x < 8 && y >= 0 && y < 8 && this.fichas[x][y]) {
		if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
			return true;
		}
	}

	// dos arriba uno izquierda
	x = this.x - 1;
	y = this.y - 2;

	if (x >= 0 && x < 8 && y >= 0 && y < 8 && this.fichas[x][y]) {
		if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
			return true;
		}
	}

	// dos arriba uno derecha
	x = this.x + 1;
	y = this.y - 2;

	if (x >= 0 && x < 8 && y >= 0 && y < 8 && this.fichas[x][y]) {
		if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
			return true;
		}
	}

	// dos abajo uno izquierda
	x = this.x - 1;
	y = this.y + 2;

	if (x >= 0 && x < 8 && y >= 0 && y < 8 && this.fichas[x][y]) {
		if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
			return true;
		}
	}
	// dos abajo uno derecha
	x = this.x + 1;
	y = this.y + 2;

	if (x >= 0 && x < 8 && y >= 0 && y < 8 && this.fichas[x][y]) {
		if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
			return true;
		}
	}

	// dos derecha uno arriba
	x = this.x + 2;
	y = this.y - 1;

	if (x >= 0 && x < 8 && y >= 0 && y < 8 && this.fichas[x][y]) {
		if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
			return true;
		}
	}

	// dos derecha uno abajo
	x = this.x + 2;
	y = this.y + 1;

	if (x >= 0 && x < 8 && y >= 0 && y < 8 && this.fichas[x][y]) {
		if (this.fichas[x][y].color !== this.color && this.fichas[x][y].nombre == REY) {
			return true;
		}
	}
}

/**
 * Verdadero si al mover esta pieza un jaque a su favor es generado
 *
 */
Ficha.prototype.generaJaque = function() {

	switch(this.nombre) {
		case PEON:
			if (this.reyEnDiagonal(true, true)) {
				return true;
			}
			break;
		case CABALLO:
			if (this.reyEnEle()) {
				return true;
			}
			break;
		case TORRE:
			if (this.reyEnVertical() || this.reyEnHorizontal()) {
				return true;
			}
			break;
		case REINA:
			if (this.reyEnVertical() || this.reyEnHorizontal() || this.reyEnDiagonal()) {
				return true;
			}
			break;
		case ALFIL:
			if (this.reyEnDiagonal()) {
				return true;
			}
			break;
		case REY:
			if (this.reyEnVertical(true) || this.reyEnHorizontal(true) || this.reyEnDiagonal(true)) {
				return true;
			}
			break;

	}
	return false;
}


/**
 * Valida que la position esta dentro del tablero
 *
 */
Ficha.prototype.positionEnTablero = function(x, y) {

	if (x < 0 || y < 0 || x > 7 || y > 7) {
		return false;
	}
	return true;
}

/**
 * Devuelve las piezas que pueden comer a this
 *
 */
Ficha.prototype.quienCome = function() {
	var piezas = [];
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (this.x == i && this.y == j) {
				continue;
			}

			if (this.fichas[i][j] && this.fichas[i][j].color !== this.color && this.fichas[i][j].puedeMover(this.x, this.y)) {
				piezas.push(this.fichas[i][j]);
			}
		}
	}

	return piezas;
}

/**
 * Devuelve el rey del mismo color
 */
Ficha.prototype.getMiRey = function() {
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (this.fichas[i][j] && this.fichas[i][j].color === this.color && this.fichas[i][j].nombre == REY) {
				return this.fichas[i][j];
			}
		}
	}
}