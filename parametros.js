var dibujo_tablero = 
"00 01 02 03 04 05 06 07" +
"10 11 12 13 14 15 16 17" +
"20 21 22 23 24 25 26 27" +
"30 31 32 33 34 35 36 37" +
"40 41 42 43 44 45 46 47" +
"50 51 52 53 54 55 56 57" +
"60 61 62 63 64 65 66 67" +
"70 71 72 73 74 75 76 77"
;
const IZQUIERDA = 1;
const DERECHA = 2;
const BLANCA = 0;
const NEGRA = 1;
const COLORES = ['BLANCA', 'NEGRA'];
const ARRIBA = 1;
const ABAJO = 0;
const PEON = 'Peon';
const TORRE = 'Torre';
const CABALLO = 'Caballo';
const ALFIL = 'Alfil';
const REINA = 'Reina';
const REY = 'Rey';
var reloj_blanca = null;
var reloj_negra = null;
var TURNO = BLANCA;