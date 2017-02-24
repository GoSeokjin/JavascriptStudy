var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

module.exports = function(){
    io.on('connection' , function(socket){
       console.log('a user connected');
    });
};