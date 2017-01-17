/* Handles the replys from bot.
 * Send to WEB and Telegram
 */

const web = require('../web/web');

// send reply to Telegram and to web interface
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
