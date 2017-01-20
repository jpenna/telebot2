/* Bot app */

const { bot } = require('./connection/connect');
const web = require('../web/web');
const botReply = require('./botReply');
const utils = require('./utils');
const { Chat } = require('../db/model/chat');

// handles /start command
bot.command('start', (msg, reply) => {
  const chat = msg.chat;
  // get user avatar and save file in /img/avatars/[id].jpg
  utils.getUserAvatar(chat.id);

  Chat.insertChat({
    chat_id: chat.id,
    type: chat.type,
    firstname: chat.firstname,
    lastname: chat.lastname,
  }).then(() => {
    web.newChat(chat);
    botReply.send(reply, msg, 'Welcome!');
  });
});

// handles text messages
bot.text((msg, reply) => {
  const chat = msg.chat;

  const data = {
    chat_id: chat.id,
    author: chat.firstname,
    type: 'client',
    message: msg.text,
    sentAt: new Date().getTime(),
  };

  Chat.insertMessage(data);
  web.sendMessage(data);
  botReply.send(reply, msg, 'Hello!');
});
