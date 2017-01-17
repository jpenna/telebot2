const { mongoose } = require('../mongoose');
const _ = require('lodash');

const chatSchema = mongoose.Schema({
  chat_id: {
    type: Number,
    required: true,
    unique: true,
  },
  type: String,
  firstname: String,
  lastname: String,
  messages: [],
});

chatSchema.methods.toJSON = function tJSON() {
  const chat = this;
  const chatObject = chat.toObject();
  chatObject.fullname = `${this.firstname} ${this.lastname}`;
  return _.pick(chatObject, ['chat_id', 'type', 'firstname', 'lastname', 'messages', 'fullname']);
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat };
