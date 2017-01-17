const {mongoose} = require('../mongoose');

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

const Chat = mongoose.model('Chat', chatSchema);

module.exports = {Chat};
