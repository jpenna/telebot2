const { mongoose } = require('../mongoose');
const _ = require('lodash');

const messageSchema = mongoose.Schema({
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
  type: String,
});

messageSchema.methods.toJSON = function toJSON() {
  const msg = this;
  const msgObject = msg.toObject();
  return _.pick(msgObject, ['author', 'message', 'sentAt', 'type']);
};

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message };
