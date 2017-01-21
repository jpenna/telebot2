/* eslint func-names:off, comma-dangle:off */

const { mongoose } = require('../mongoose');
const _ = require('lodash');

const chatSchema = mongoose.Schema({
  chatId: {
    type: Number,
    required: true,
    unique: true,
  },
  chatType: {
    type: String,
    required: true,
  },
  firstname: String,
  lastname: String,
  messages: [{
    author: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    type: {
      type: String,
    },
  }],
});

// Insert new Chat
chatSchema.statics.insertChat = function (chatId, chatType, firstname, lastname) {
  const Chat = this;

  const chatData = {
    chatId,
    chatType,
    firstname,
    lastname
  };

  const chat = new Chat(chatData);
  return chat.save();
};

// Insert new message on chat document
chatSchema.statics.insertMessage = function (chatId, type, author, message, sentAt) {
  const messageData = {
    author,
    message,
    type,
    sentAt,
  };

  return this.findOneAndUpdate({ chatId },
    { $push: { messages: messageData } },
    { new: true }
  ).exec();
};

// Get all chats
chatSchema.statics.findChats = function () {
  return this.find({}).exec();
};

chatSchema.statics.findChatById = function (chatId) {
  return this.findOne({ chatId: chatId }).exec();
};

chatSchema.methods.toJSON = function tJSON() {
  const chat = this;
  const chatObject = chat.toObject();
  chatObject.fullname = `${this.firstname} ${this.lastname}`;
  return _.pick(chatObject, ['chatId', 'type', 'firstname', 'lastname', 'messages', 'fullname']);
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat };
