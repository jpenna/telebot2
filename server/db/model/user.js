/* eslint func-names: off */

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

userSchema.statics.insertUser = function (id, email, token, expirationDate) {
  const User = this;

  const userData = { id, email, token, expiration_date: expirationDate };
  const user = new User(userData);
  return user.save();
};

userSchema.statics.findUserByToken = function (token) {
  return this.findOne({ token });
};

userSchema.statics.findUserById = function (id) {
  return this.findOne({ id });
};

userSchema.statics.removeUser = function (id) {
  return this.remove({ id }).exec();
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
