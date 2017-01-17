const { Chat } = require('../db/model/chat');
const { Message } = require('../db/model/message');
const _ = require('lodash');

const db = {
  insertChat(data) {
    const chatData = _.pick(data, ['chat_id', 'type', 'firstname', 'lastname']);

    const chat = new Chat(chatData);
    chat.save((err) => {
      if (err) return console.log(err);
      return console.log('chat saved');
    });
  },

  insertMessage(data) {
    const chatId = data.chat_id;
    const messageData = _.pick(data, ['author', 'message', 'sentAt', 'type']);

    const message = new Message(messageData);

    Chat.findOneAndUpdate({ chat_id: chatId },
      { $push: { messages: message } },
      { upsert: true },
      (err) => {
        if (err) {
          console.log(err);
        }
      });
  },

  findChats() {
    return Chat.find({}).exec((err, data) => {
      if (err) {
        return reject(err);
      }

      return data;
    });
  },

  findChatMessages(chatId) {
    return Chat.findOne({ chat_id: chatId }).exec((err, data) => {
      if (err) {
        return reject(err);
      }
      return data;
    });
  },
};

module.exports = { db };
