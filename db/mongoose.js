/* connect to MongoDB */

const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/telebot');

module.exports = {mongoose};
