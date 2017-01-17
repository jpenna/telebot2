const {io} = require('../server.js');
const {request} = require('https');
const {db} = require('../utils/db');

web = {
  // send message to web interface
  sendMessage (data) {
    io.emit('newMessage', data);
  },

  // send chat to chat list in web interface
  newChat (data) {
    io.emit('newChat', data);
  }

};


io.on('connection', (socket) => {

  db.findChats().then((chats) => {

    let data;

    if (!chats) {
      data = null;
    } else {
      // don't send messages from chats user isn't seeing
      data = chats.map((obj, key) => {
        const msg = obj;
        if (key !== 0) {
          msg.messages = {};
        }
        return msg;
      });
    }

    socket.emit('populateChats', {chats: data});

  }).catch((err) => console.log(err));

  // send message to user on Telegram
  socket.on('sendTelegram', (data, callback) => {

    const postData = JSON.stringify({
      chat_id: 231095546,
      text: data
    });

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

    // run callback from client socket
    callback();
  });

});

module.exports = web
