const { Chat } = require('../db/model/chat');
const { Message } = require('../db/model/message');
const { User } = require('../db/model/user');
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

  insertUser(id, email, token, expirationDate) {
    const userData = { id, email, token, expiration_date: expirationDate };
    const user = new User(userData);
    return user.save();
  },

  findUserByToken(token) {
    User.findOne({ token }).then(result => result)
    .catch((err) => {
      console.log(err);
      return false;
    });
  },

  findUserById(id) {
    User.findOne({ id }).then(result => result)
    .catch((err) => {
      console.log(err);
      return false;
    });
  },

};

module.exports = { db };
