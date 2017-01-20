const { bot } = require('./connection/connect');
const web = require('../web/web');
const botReply = require('./botReply');
const utils = require('./utils');
const { Chat } = require('../db/model/chat');

// bot.all((msg, reply, next) => {
//   Chat.findChatById(msg.chat.id).then((result) => {
//
//   });
//   next();
// });

/* handles /start command */
bot.command('start', (msg, reply) => {
  const chat = msg.chat;

  // get user avatar and save file in /img/avatars/[id].jpg
  utils.getUserAvatar(chat.id);

  const chatData = {
    chat_id: chat.id,
    chatType: chat.type,
    firstname: chat.firstname,
    lastname: chat.lastname,
  };

  Chat.insertChat(chatData).then(() => {
    web.newChat(chatData);
    botReply.send(reply, msg, 'Welcome!');
  });
});

/* handles text messages */
bot.text((msg, reply) => {
  const chat = msg.chat;

  const messageData = {
    chat_id: chat.id,
    chatType: chat.type,
    firstname: chat.firstname,
    lastname: chat.lastname,
    author: chat.firstname,
    type: 'client',
    message: msg.text,
    sentAt: new Date().getTime(),
  };

  Chat.insertMessage(messageData).then((result) => {
    if (result === 'newChat') {
      web.newChat(messageData);
    }
    web.sendMessage(messageData);
    botReply.send(reply, msg, 'Hello!');
  });
});
