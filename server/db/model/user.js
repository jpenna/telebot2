const { mongoose } = require('../mongoose');

const userSchema = mongoose.Schema({
  token: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  id: {
    required: true,
    type: Number,
  },
  expiration_date: {
    required: true,
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
