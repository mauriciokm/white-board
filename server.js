var app = require('express').createServer()
  , io = require('socket.io').listen(app)
  , express = require('express')
  , fs = require('fs');


var i = 0;

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

app.get('/postit/new', function(req, res){
    res.send({next_id: i++});
});

io.sockets.on('connection', function (socket) {
  proxyBroadcast('create', socket);
  proxyBroadcast('start-drag', socket);
  proxyBroadcast('stop-drag', socket);
  proxyBroadcast('editing', socket);
  proxyBroadcast('edited', socket);
});

function proxyBroadcast(action, socket) {
  socket.on(action, function(data){
      socket.broadcast.emit(action, data);
  });
}

app.listen(8888, '192.168.1.7')
