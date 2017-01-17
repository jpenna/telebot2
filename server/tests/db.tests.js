/* eslint-disable */
require('../config/config');
const expect = require('expect');
const { Chat } = require('../db/model/chat');
const { ObjectId } = require('mongodb');
const { db } = require('../utils/db');

beforeEach(() => {
  Chat.remove({}).exec();
  id1 = new ObjectId(1);
  id2 = new ObjectId(2);
  msgId1 = new ObjectId(2);
  msgId2 = new ObjectId(3);
  chat1 = {
    _id: id1,
    chat_id: 1,
    type: 'user',
    firstname: 'Juliano',
    lastname: 'Penna',
    messages: [],
  };
  chat2 = {
    _id: id2,
    chat_id: 2,
    type: 'user',
    firstname: 'Mark',
    lastname: 'Hughs',
    messages: [],
  };
  msg1 = {
    author: 'Juliano',
    message: 'gfd',
    _id: msgId1,
  };
  msg2 = {
    author: 'Juliano',
    message: 're',
    _id: msgId2,
  };
});

describe('db.insertChat', () => {
  it('should insert to DB', (done) => {
    db.insertChat(chat1).then(() => {
      Chat.find({ chat_id: chat1.chat_id }).then((chat) => {
        expect(chat.length).toBe(1);
        done();
      });
    }).catch(e => console.log(e));;
  });

  it('should not insert invalid data', (done) => {
    delete chat1.chat_id;
    db.insertChat(chat1).then().catch(e => {
      Chat.find({ _id: id1 }).then((chat) => {
        expect(chat.length).toBe(0);
        done();
      });
    });
  });
});

describe('db.insertMessage', () => {
  it('should insert new message and keep old ones', (done) => {
    db.insertChat(chat1).then((chat) => {
      db.insertMessage(chat1.chat_id, msg2).then(() => {
        db.insertMessage(chat1.chat_id, msg1).then((chat) => {
          expect(chat.messages.length).toBe(2);
          done();
        });
      });
    }).catch(e => {});
  });
});

describe('db.findChats', () => {
  it('should return all chats', (done) => {

    db.insertChat(chat1).then(() => {
      db.insertChat(chat2).then(() => {
        db.findChats().then((data) => {
          expect(data.length).toBe(2);
          done();
        });
      });
    }).catch(e => {});

  });
});

describe('db.findChatById', () => {
  it('should return chat messages', (done) => {
    db.insertChat(chat1).then(() => {
      db.insertMessage(chat1.chat_id, msg2).then(() => {
        db.insertMessage(chat1.chat_id, msg1).then((chat) => {
          db.findChatMessages(chat1.chat_id).then((chat) => {
            expect(chat.messages.length).toBe(2);
            done();
          })
        });
      });
    }).catch(e => {});
  });
})
