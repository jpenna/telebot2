const { Chat } = require('../db/model/chat');
const { Message } = require('../db/model/message');
const _ = require('lodash');

const db = {
  insertChat(data) {
    const chatData = _.pick(data, ['chat_id', 'type', 'firstname', 'lastname']);

    const chat = new Chat(chatData);
    return chat.save();
  },

  insertMessage(chatId, data) {
    // const chatId = data.chat_id;
    const messageData = _.pick(data, ['author', 'message', 'sentAt', 'type']);

    const message = new Message(messageData);

    return Chat.findOneAndUpdate({ chat_id: chatId },
      { $push: { messages: message } },
      { upsert: true, new: true }).exec();
  },

  findChats() {
    return Chat.find({}).exec();
  },

  findChatById(chatId) {
    return Chat.findOne({ chat_id: chatId }).exec();
  },
};

module.exports = { db };
