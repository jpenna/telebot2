const {bot} = require('./connection/connect');
const web = require('../web/web.js');
// const replyUser = require('../web/web.js');
// const {io} = require('../server.js');



bot.text((msg, reply, next) => {
  web.sendMessage(msg.text);


  // replyUser.sendReply(reply, message);

  reply.text('Hello!');
  web.sendMessage('Hello!');

});
