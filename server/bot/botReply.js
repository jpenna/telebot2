const web = require('../web/web');


function send (reply, replyMessage) {
  reply.text(replyMessage);

  const data = {
    message: replyMessage,
    author: 'Telebot'
  }

  web.sendMessage(data);
}

module.exports = {
  send
}
