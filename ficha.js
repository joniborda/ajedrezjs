function Ficha(tablero, casillas, x, y) {
	this.movio = false;
	this.casillas = casillas;
	this.casillas[x][y] = this;
	this.x = x;
	this.y = y;
	this.tablero = tablero;
	this.tablero.append(this.ficha);
}
Ficha.prototype.setPosition = function(x, y) {
	this.ficha.css('position', 'absolute');
	this.ficha.css('left', x * 40);
	this.ficha.css('top', y * 40);
	this.x = x;
	this.y = y;
}

Ficha.prototype.setColor = function(color) {
	this.color = color;
	if (color == 'blanco') {
		this.ficha.css('color', '#FFF');
	} else {
		this.ficha.css('color', '#000');
	}
}
Ficha.prototype.mover = function(x, y) {

	if (x < 0 || y < 0 || x > 7 || y > 7) {
		console.log('se fue del tablero');
		return false;
	}

	if (this.casillas[x][y]) {
		if (this.casillas[x][y].color == this.color) {
			console.log('no puede comer al del mismo color');
			return false;
		}
	}

	if (this.puedeMover(x, y)) {
		this.movio = true;
		this.casillas[this.x][this.y] = null;

		if (this.enroque) {
			this.enrocar(x, y);
		} else {
			if (this.casillas[x][y]) {
				console.log('comio ' + this.casillas[x][y].nombre);
				this.casillas[x][y].remover();
			}
			this.setPosition(x, y);
			this.casillas[x][y] = this;
			
		}

		return true;
	}
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
				if (this.casillas[x][i]) {
					console.log('no puede porque hay alguien en el medio en vertical');
					return false;
				}
			}
			
		}

		// arranco de y hasta this.y (sin las puntas)
		if (this.y - y > 0) {
			for(var i = y + 1; i < this.y; i++) {
				if (this.casillas[x][i]) {
					console.log('no puede porque hay alguien en el medio en vertical');
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
				if (this.casillas[i][y]) {
					console.log('no puede porque hay alguien en el medio en horizontal');
					return false;
				}
			}
			
		}

		// arranco de x hasta this.x (sin las puntas)
		if (this.x - x > 0) {
			for(var i = x + 1; i < this.x; i++) {
				if (this.casillas[i][y]) {
					console.log('no puede porque hay alguien en el medio en horizontal');
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
		console.log('mueve en vertical ¿?');
		return false;
	}

	// tiene que mover la misma distancia en verticual como en horizontal
	if (Math.abs(this.y - y) === Math.abs(this.x - x)) {
		console.log('no mueve la misma distancia');
		return false;
	}

	// arranco de this.x hasta x (sin las puntas)
	if (this.x - x < 0) {
		if (this.y - y < 0) {
			for(var i = this.x + 1; i < x; i++) {
				if (this.casillas[i][i]) {
					console.log('no puede porque hay alguien en el medio en diagonal para abajo');
					return false;
				}
			}
		}

		if (this.y - y > 0) {
			for(var i = x; i < this.x + 1; i++) {
				if (this.casillas[i][i]) {
					console.log('no puede porque hay alguien en el medio en diagonal para arriba');
					return false;
				}
			}
		}
	}

	// arranco de x hasta this.x (sin las puntas)
	if (this.x - x > 0) {
		if (this.y - y < 0) {
			for(var i = x + 1; i < this.x; i++) {
				if (this.casillas[i][i]) {
					console.log('no puede porque hay alguien en el medio en diagonal para abajo');
					return false;
				}
			}
		}

		if (this.y - y > 0) {
			for(var i = x; i < this.x + 1; i++) {
				if (this.casillas[i][i]) {
					console.log('no puede porque hay alguien en el medio en diagonal para abajo');
					return false;
				}
			}
		}
		
	}

	return true;
}