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
    fs.readFile(__dirname + '/index_new.html', 'utf8', function(err, text){
        res.send(text);
    });
});

io.sockets.on('connection', function (socket) {
  socket.on('new', function(fn) {
    i = i+1;
    console.log(i);
    fn("postit-"+i);
  });
});
app.listen(8888, '192.168.1.7')
