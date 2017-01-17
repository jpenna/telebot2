const mongoose = require('../mongoose');

const messageSchema = mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: String,
  sentAt: {
    type: Date,
    required: true,
    default: Date.now
});

const message = mongoose.model('Message', messageSchema);

module.exports = {message};
