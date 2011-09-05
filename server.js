var app = require('express').createServer()
  , io = require('socket.io').listen(app)
  , express = require('express')
  , fs = require('fs');

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
  // disable layout
  app.set("view options", {layout: false});
});

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

io.sockets.on('connection', function (socket) {
  socket.on('new', function (data) {
    console.log(data);
  });
});

app.listen(8888, '127.0.0.1')
