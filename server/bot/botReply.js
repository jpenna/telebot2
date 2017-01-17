/* Handles the replys from bot.
* Send to WEB and Telegram
*/

const web = require('../web/web');
const {db} = require('../utils/db');

// send reply to Telegram, web interface and persist data
function send (reply, msg, replyMessage) {
  const chat = msg.chat;

  reply.text(replyMessage);

  const data = {
      chat_id: chat.id,
      author: 'Telebot',
      type: 'bot',
      message: replyMessage,
      sentAt: new Date().getTime()
  }
  web.sendMessage(data);
  db.insertMessage(data);
}

module.exports = {
  send
}
