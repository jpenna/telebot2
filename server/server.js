const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3100);

app.use(express.static(path.join(__dirname, '../public')));

console.log(path.join(__dirname + '../public'));

io.on('connection', (socket) => {
  socket.on('newMessage', (data, callback) => {
    console.log(data);
    callback();
  });
});
