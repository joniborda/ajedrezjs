function Rey(tablero, casillas, x, y, color) {
	this.ficha = $('<div class="pieza glyphicon glyphicon-king"></div>');
	Ficha.call(this, tablero, casillas, x, y);
	this.nombre = 'Rey';
	this.setPosition(x, y);
	this.setColor(color);
};
Rey.prototype = Object.create(Ficha.prototype);

Peon.prototype.puedeMover = function(x, y) {

	// una position
	if (Math.abs(this.y - y) !== 1 || Math.abs(this.x - x) !== 1) {
		console.log('no puede mover');
		return false;
	}
	return true;
}
