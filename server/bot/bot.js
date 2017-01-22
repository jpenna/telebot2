const { bot } = require('./connection/connect');
const web = require('../web/web');
const botReply = require('./botReply');
const utils = require('./utils');
const { Chat } = require('../db/model/chat');

/* handles /start command */
bot.command('start', (msg, reply) => {
  const chat = msg.chat;

  const chatId = chat.id;
  const chatType = chat.type;
  const firstname = chat.firstname;
  const lastname = chat.lastname;

  // get user avatar and save file in /img/avatars/[id].jpg
  utils.getUserAvatar(chatId);

  Chat.insertChat(chatId, chatType, firstname, lastname).then(() => {
    web.newChat(chatId, chatType, firstname, lastname);
    botReply.send(reply, msg, 'Welcome!');
  });
});

/* handles text messages */
bot.text((msg, reply) => {
  const chat = msg.chat;

  const chatId = chat.id;
  const chatType = chat.type;
  const firstname = chat.firstname;
  const lastname = chat.lastname;
  const type = 'user';
  const message = msg.text;
  const sentAt = msg.date;

  function saveMessage() {
    Chat.insertMessage(chatId, type, firstname, message, sentAt)
    .then((result) => {
      // Success or failed?
      if (!result) {
        // Fail: insert Chat
        Chat.insertChat(chatId, chatType, firstname, lastname)
        .then(() => {
          // Then repeat and send NEW CHAT to web
          saveMessage();
          web.newChat(chatId, chatType, firstname, lastname);
        });
      } else {
        // Success: send message to web and reply from bot
        web.sendMessage(chatId, type, firstname, message, sentAt);
        botReply.send(reply, msg, 'Hello!');
      }
    }).catch(err => console.log(err));
  }

  saveMessage();
});

module.exports = { bot };
