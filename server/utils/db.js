const {Chat} = require('../db/model/chat');
const {Message} = require('../db/model/message');
const _ = require('lodash');

const db = {
  insertChat (data) {

    const chatData = _.pick(data, ['chat_id', 'type', 'firstname', 'lastname']);

    const chat = new Chat(chatData);
    chat.save(function (err) {
      if (err) return console.log(err);
      console.log('chat saved');
    });
  },

  insertMessage(data) {
    const chatId = data.chat_id;
    const messageData = _.pick(data, ['author', 'message', 'sentAt', 'type']);

    const message = new Message(messageData);

    Chat.findOneAndUpdate({ chat_id: chatId },
      { $push: { messages: message }}, { upsert: true },
      (err) => {
        if (err)
          console.log(err)
      });
  },

  findChats() {
    return Chat.find({}).exec((err, data) => {
      if (err) {
        reject(err);
      }

      return data;
    });
  }

}

module.exports = {db};
