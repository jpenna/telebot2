const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3100);

app.get('/', (req, res) => {
  res.send('oi');
});

io.on('connection', (socket) => {

});
