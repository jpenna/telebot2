/* Handles the replys from bot.
* Send to WEB and Telegram
*/

const web = require('../web/web');
const { Chat } = require('../db/model/chat');

const author = 'Telebot';
const type = 'bot';

// send reply to Telegram, web interface and persist data
function send(reply, botAPIMsg, msg) {
  const messageData = {
    author,
    type,
    chat_id: botAPIMsg.chat.id,
    message: msg,
    sentAt: new Date().getTime(),
  };

  reply.text(msg);
  web.sendMessage(messageData);
  Chat.insertMessage(messageData);
}

module.exports = { send };
