const {bot} = require('./connection/connect');
const web = require('../web/web');
const botReply = require('./botReply');



bot.text((msg, reply, next) => {
  web.sendMessage(msg.text);
  botReply.send(reply, msg.text);
});
