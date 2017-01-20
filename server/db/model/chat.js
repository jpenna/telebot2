/* eslint func-names:off, comma-dangle:off */

const { mongoose } = require('../mongoose');
const _ = require('lodash');

const chatSchema = mongoose.Schema({
  chat_id: {
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

/*
Insert new Chat
@param data Object {chat_id, type, firstname, lastname}
*/
chatSchema.statics.insertChat = function (data) {
  const Chat = this;

  const chatData = _.pick(data, ['chat_id', 'chatType', 'firstname', 'lastname']);
  const chat = new Chat(chatData);
  return chat.save();
};

/*
Insert new message on chat document
@param data Object {chat_id, author, message, sentAt, type}
*/
chatSchema.statics.insertMessage = function (data) {
  const messageData = _.pick(data, ['author', 'message', 'sentAt', 'type']);

  return this.findOneAndUpdate({ chat_id: data.chat_id },
    { $push: { messages: messageData } },
    { new: true }
  ).exec().then((result) => {
    if (!result) {
      return this.insertChat(data).then(() => {
        this.insertMessage(data);
        return 'newChat';
      });
    }
  });
};

// Get all chats
chatSchema.statics.findChats = function () {
  return this.find({}).exec();
};

chatSchema.statics.findChatById = function (chatId) {
  return this.findOne({ chat_id: chatId }).exec();
};

chatSchema.methods.toJSON = function tJSON() {
  const chat = this;
  const chatObject = chat.toObject();
  chatObject.fullname = `${this.firstname} ${this.lastname}`;
  return _.pick(chatObject, ['chat_id', 'type', 'firstname', 'lastname', 'messages', 'fullname']);
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat };
