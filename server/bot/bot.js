/* Bot app */

const {bot} = require('./connection/connect');
const web = require('../web/web');
const botReply = require('./botReply');
const {db} = require('../utils/db');

// handles /start command
bot.command("start", (msg, reply, next) => {
  console.log(msg);
  const chat = msg.chat;

  web.newChat(chat);
  botReply.send(reply, 'Welcome!');

  db.insertChat({
    chat_id: chat.id,
    type: chat.type,
    firstname: chat.firstname,
    lastname: chat.lastname
  });
});

// handles text messages
bot.text((msg, reply, next) => {
  console.log(msg);

  const chat = msg.chat;

  const data = {
    chat_id: chat.id,
    author: chat.firstname,
    message: msg.text,
    sentAt: new Date().getTime()
  }

  db.insertMessage(data);
  web.sendMessage(data);
  botReply.send(reply, 'Hello!');
});
