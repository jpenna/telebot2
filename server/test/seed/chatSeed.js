const { Chat } = require('../../db/model/chat');
const { ObjectId } = require('mongodb');

const id1 = new ObjectId();
const id2 = new ObjectId();
const id3 = new ObjectId();
const sentAt = new Date();


const chat1 = {
  _id: id1,
  chatId: 1,
  chatType: 'text',
  firstname: 'Marcus',
  lastname: 'Aurelius',
  messages: [
    {
      sentAt,
      _id: id1,
      author: 'Marcus',
      message: 'Invasion',
      type: 'user'
    },
    {
      sentAt,
      _id: id2,
      author: 'Telebot',
      message: 'Welcome',
      type: 'bot'
    }
  ]
};

const chat2 = {
  _id: id2,
  chatId: 2,
  chatType: 'text',
  firstname: 'Lina',
  lastname: 'Krakovski',
  messages: [
    {
      sentAt,
      _id: id1,
      author: 'Lina',
      message: 'Explode',
      type: 'user'
    },
    {
      sentAt,
      _id: id2,
      author: 'Telebot',
      message: 'Why?',
      type: 'bot'
    }
  ]
};

const chat3 = {
  _id: id3,
  chatId: 3,
  chatType: 'text',
  firstname: 'Nacib',
  lastname: 'Nacibius',
  messages: []
};

const msg1 = {
  author: 'Juliano',
  message: 'GOGOGO',
  type: 'user',
  _id: id1,
};

// const msg2 = {
//   author: 'Juliano',
//   message: 'Fire in the hole!',
//   _id: id2,
// };

function populateChats() {
  return Chat.remove({}, () => {
    new Chat(chat1).save();
    new Chat(chat2).save();
  });
}

module.exports = {
  chat1, chat2, chat3, msg1, populateChats
};
