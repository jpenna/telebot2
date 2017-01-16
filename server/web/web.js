const { io } = require('../server.js');


function sendMessage (message) {
  io.emit('newMessage', message);
}


// io.on('connection', (socket) => {
//
//   socket.on('newMessage', (data, callback) => {
//     console.log(data);
//     callback();
//   });
//
// });

module.exports = {
  sendMessage
}
