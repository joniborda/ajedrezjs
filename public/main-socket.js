var socket = io.connect('http://localhost:5000');

var username = 'joni';

socket.on('connect', function(){
    console.log('se logueo con esto ' + username);
});
socket.emit('add_user', username);

var para = require("./parametros.js");