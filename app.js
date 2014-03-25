var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('toClient', { myKey: 'myValue' });
  socket.on('fromClient', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function () {
    console.log('Connection Disconnected!!!');
    io.sockets.emit('user disconnected');
  });
});