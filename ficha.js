function Ficha(tablero, fichas, x, y) {
	this.movio = false;
	this.fichas = fichas;
	this.fichas[x][y] = this;
	this.x = x;
	this.y = y;
	this.tablero = tablero;

	this.tablero.append(this.ficha);
}
Ficha.prototype.setPosition = function(x, y) {
	this.ficha.css('position', 'absolute');
	this.ficha.css('left', x * 40);
	this.ficha.css('top', y * 40);
	this.ficha.attr('x', x);
	this.ficha.attr('y', y);
	this.x = x;
	this.y = y;
}

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
					alert('jaque');
				}
			}
		}

		// TODO: falta ver que pieza es para ver que jaque puede generar.

		// TODO: se deberia revisar todas las piezas en cada movimiento porque 
		// por ahí una mueve una pieza que lo que hace es despejar 
		// el camino hacia el jaque

		return true;
	}

	this.fichas[this.x][this.y].setPosition(this.x, this.y);
	return false;
}

Ficha.prototype.remover = function() {
	this.ficha.remove();
	// ver si las muestro al costado
}

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
		return true;
	}
}

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
			// TODO:diagonal pero de a uno
			if (this.reyEnVertical(true) || this.reyEnHorizontal(true) || this.reyEnDiagonal(true)) {
				return true;
			}
			break;

	}
	return false;
}


Ficha.prototype.positionEnTablero = function(x, y) {

	if (x < 0 || y < 0 || x > 7 || y > 7) {
		return false;
	}
	return true;
}
