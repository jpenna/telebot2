/* Bot app */

const {bot} = require('./connection/connect');
const web = require('../web/web');
const botReply = require('./botReply');

// handles /start command
bot.command("start", (msg, reply, next) => {
  console.log(msg);
  web.newChat(msg.chat);
  botReply.send(reply, 'Welcome!');
});

// handles text messages
bot.text((msg, reply, next) => {

  const data = {
    message: msg.text,
    author: msg.chat.name
  }

  web.sendMessage(data);
  botReply.send(reply, 'Hello!');
});
