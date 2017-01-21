const { io } = require('../server.js');
const { request } = require('https');
const { Chat } = require('../db/model/chat');
const axios = require('axios');


const web = {
  /*
  Send message to web interface
  @param data Object expect {chat_id, type, author, message, sentAt}
  */
  sendMessage(chatId, type, author, message, sentAt) {
    const messageData = {
      author,
      chatId,
      type,
      message,
      sentAt
    };

    io.emit('newMessage', messageData);
  },

  /*
  Send chat to chat list in web interface
  @param data Object expect {chat_id, type, firstname, lastname}
  */
  newChat(chatId, chatType, firstname, lastname) {

    const chatData = {
      chatId,
      chatType,
      firstname,
      lastname
    };

    io.emit('newChat', chatData);
  },

};

io.on('connection', (socket) => {

  // Send chats to populate chat list
  socket.on('getChats', () => {
    Chat.findChats().then((chatsResult) => {
      let chats;

      if (!chatsResult) {
        chats = undefined;
      } else {
        // Just send all messages for active chat. The others get last message for preview
        chats = chatsResult.map((obj, key) => {
          const chat = obj;
          if (key !== 0) {
            chat.messages = [
              chat.messages[chat.messages.length - 1],
            ];
          }
          return chat;
        });
      }

      socket.emit('populateChats', { chats });

    }).catch(err => console.log(err));
  });

  // Send chat messages on change active chat
  socket.on('getChatMessages', (chatId) => {
    Chat.findChatById(chatId).then((data) => {
      if (!data) {
        return;
      }
      socket.emit('populateChatMessages', { messages: data.messages });
    }).catch(err => console.log(err));
  });

  // Send message to Telegram client
  socket.on('sendTelegram', (data) => {

    const postData = {
      chat_id: data.chatId,
      text: data.message,
    };

    console.log('oisdf');

    // Send message to API
    axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, postData)
    .then(() => {

      // After sent, insert message in DB
      const author = 'Telebot';
      const message = data.message;
      const sentAt = new Date().getTime();

      Chat.insertMessage(data.chatId, data.type, author, message, sentAt);

    }).catch(err => console.log('on.sendTelegram:', err));

  });
});


module.exports = web;
