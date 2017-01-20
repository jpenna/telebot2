/* Handles the replys from bot.
* Send to WEB and Telegram
*/

const web = require('../web/web');
const { Chat } = require('../db/model/chat');

const author = 'Telebot';
const type = 'bot';

// send reply to Telegram, web interface and persist data
function send(reply, msg, replyMessage) {
  const chat = msg.chat;
  const data = {
    author,
    type,
    chat_id: chat.id,
    message: replyMessage,
    sentAt: new Date().getTime(),
  };

  reply.text(replyMessage);
  web.sendMessage(data);
  Chat.insertMessage(chat.id, data);
}

module.exports = { send };
