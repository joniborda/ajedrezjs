function Torre(tablero, fichas, x, y, color) {
	this.ficha = $('<div class="pieza"><i class="fas fa-chess-rook"></i></div>');
	Ficha.call(this, tablero, fichas, x, y);
	this.nombre = PARAMETROS.TORRE;
	this.setPosition(x, y);
	this.setColor(color);
};
Torre.prototype = Object.create(Ficha.prototype);

Torre.prototype.puedeMover = function(x, y) {


	// o vertical o horizontal
	if (this.y - y === 0 || this.x - x === 0) {
		
		if (this.nadieVertical(x, y) && this.nadieHorizontal(x, y)) {
			return true;
		}
	}
	return false;
}