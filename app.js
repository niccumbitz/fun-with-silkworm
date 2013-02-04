var express = require('express'),
    app = express.createServer(),
    st = require('node-static'),
    jquery = require('jquery'),
    io = require('socket.io').listen(app),
    sys = require('util'),
    exec = require('child_process').exec,
    platform = process.platform,
    click_script = null;

app.listen(8080);

app.use(express.static(__dirname + "/public"));

app.get('/browser', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/phone', function (req, res) {
  res.sendfile(__dirname + '/phone.html');
});

io.sockets.on('connection', function (socket) {  
  socket.on('touchstart', function(data){
      socket.broadcast.emit('touchstart', data);
  });
  
  socket.on('touchmove', function(data){
      socket.broadcast.emit('touchmove', data);
  });
  
  socket.on('touchend', function(data){
      socket.broadcast.emit('touchend', data);
  });
});