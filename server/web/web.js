const { io } = require('../server.js');
const { request } = require('https');
const { Chat } = require('../db/model/chat');
const axios = require('axios');


const web = {
  /*
  Send message to web interface
  @param data Object expect {chat_id, type, author, message, sentAt}
  */
  sendMessage(data) {
    io.emit('newMessage', data);
  },

  /*
  Send chat to chat list in web interface
  @param data Object expect {chat_id, type, firstname, lastname}
  */
  newChat(data) {
    io.emit('newChat', data);
  },

};

io.on('connection', (socket) => {

  // Send chats to populate chat list
  socket.on('getChats', () => {
    Chat.findChats().then((chatsResult) => {
      let chats;
      console.log(chatsResult);
      if (!chatsResult) {
        chats = undefined;
      } else {
        // Just send all messages for active chat. The others get last message for preview
        chats = chatsResult.map((obj, key) => {
          const msg = obj;
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

    const postData = {
      chat_id: data.chat_id,
      type: data.type,
      text: data.message,
    };

    // Send message to API
    axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, postData)
    .then((res) => {
      
      // After sent, insert message in DB
      const message = {
        author: 'Telebot',
        message: res.data.message
      };

      Chat.insertMessage(data.chat_id, message);

    }).catch(err => console.log('on.sendTelegram:', err));

  });
});


module.exports = web;
