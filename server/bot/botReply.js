/* Handles the replys from bot.
* Send to WEB and Telegram
*/

const web = require('../web/web');
const { Chat } = require('../db/model/chat');


// send reply to Telegram, web interface and persist data
function send(reply, botAPIMsg, msg) {

  const author = 'Telebot';
  const type = 'bot';
  const chatId = botAPIMsg.chat.id;
  const message = msg;
  const sentAt = new Date().getTime();

  reply.text(msg);
  web.sendMessage(chatId, type, author, message, sentAt);
  Chat.insertMessage(chatId, type, author, message, sentAt);
}

module.exports = { send };
