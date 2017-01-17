const {mongoose} = require('../mongoose');
const _ = require('lodash');

const chatSchema = mongoose.Schema({
  chat_id: {
    type: Number,
    required: true,
    unique: true
  },
  type: String,
  firstname: String,
  lastname: String,
  messages: []
});

chatSchema.methods.toJSON = function () {
  const chat = this;
  const chatObject = chat.toObject();
  return _.pick(chatObject, ['chat_id', 'type', 'firstname', 'lastname', 'messages']);
}

const Chat = mongoose.model('Chat', chatSchema);

module.exports = {Chat};
