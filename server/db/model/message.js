const {mongoose} = require('../mongoose');

const messageSchema = mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {Message};
