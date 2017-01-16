const {bot} = require('./connection/connect');
const web = require('../web/web');
const botReply = require('./botReply');



bot.text((msg, reply, next) => {

  const data = {
    message: msg.text,
    author: msg.chat.name
  }

  web.sendMessage(data);
  botReply.send(reply, 'Hello!');
});
