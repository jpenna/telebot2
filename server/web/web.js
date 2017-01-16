const {io} = require('../server.js');
const {request} = require('https');


function sendMessage (data) {
  io.emit('newMessage', data);
}


io.on('connection', (socket) => {

  socket.on('sendTelegram', (data, callback) => {

    const postJSON = {
      chat_id: 231095546,
      text: data
    };

    const postData = JSON.stringify(postJSON);

    var options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: '/bot266093667:AAGi5U5Rdf4Di-zwJ1aFcm7idJN7Xt7tyZw/sendMessage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    var req = request(options, (res) => {

      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    req.write(postData);

    req.on('error', (e) => {
      console.error(e);
    });

    req.end();

    callback();
  });

});

module.exports = {
  sendMessage
}
