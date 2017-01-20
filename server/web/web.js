const { io } = require('../server.js');
const { request } = require('https');
const { Chat } = require('../db/model/chat');
const axios = require('axios');


const web = {
  // Send message to web interface
  sendMessage(data) {
    io.emit('newMessage', data);
  },

  // Send chat to chat list in web interface
  newChat(data) {
    io.emit('newChat', data);
  },

};

io.on('connection', (socket) => {

  // Send chats to populate chat list
  socket.on('getChats', () => {
    Chat.findChats().then((chatsResult) => {
      let chats;
      if (!chatsResult) {
        chats = null;
      } else {
        // Just send all messages for active chat. The others get last message for preview
        chats = chatsResult.map((msg, key) => {
          if (key !== 0) {
            msg.messages = [
              msg.messages[msg.messages.length - 1],
            ];
          }
          return msg;
        });
      }

      socket.emit('populateChats', { chats });

    }).catch(err => console.log(err));
  });

  // Send chat messages on change active chat
  socket.on('getChatMessages', (chatId) => {
    Chat.findChatById(chatId).then((data) => {
      socket.emit('populateChatMessages', { messages: data.messages });
    }).catch(err => console.log(err));
  });

  // Send message to Telegram client
  socket.on('sendTelegram', (data) => {

    const postData = JSON.stringify({
      chat_id: data.chat_id,
      type: data.type,
      text: data.message,
    });

    // const options = {
    //   // hostname: 'api.telegram.org',
    //   // port: 443,
    //   // path: '/bot266093667:AAGi5U5Rdf4Di-zwJ1aFcm7idJN7Xt7tyZw/sendMessage',
    //   // method: 'POST',
    //   // headers: {
    //   //   'Content-Type': 'application/json',
    //   //   'Content-Length': Buffer.byteLength(postData),
    //   // },
    // };

    axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, postData)
    .then((res) => {
      const message = {
        author: 'Telebot',
        message: res.data.message,
      }

      Chat.insertMessage(data.chat_id, message);

    }).catch(err => console.log('on.sendTelegram:', err));

    // const req = request(options, (res) => {
    //   let body = '';
    //
    //   res.on('data', (d) => {
    //     body += d;
    //   });
    //
    //   res.on('end', () => {
    //     body = JSON.parse(body);
    //     if (body.ok) {
        // }
      // });
    // });

    // req.write(postData);
    //
    // req.on('error', (e) => {
    //   console.error(e);
    // });
    //
    // req.end();

    // run callback from client socket
    // callback();
  });
});


module.exports = web;
