/* eslint no-undef:off, camelcase:off */

require('../../config/config');
const expect = require('expect');
const { Chat } = require('../../db/model/chat');
const chatSeed = require('../seed/chatSeed');

describe('Chat', () => {
  before(() => {
    // chat3
    const chat3 = chatSeed.chat3;
    chatId_3 = chatSeed.chat3.chatId;
    chatType = chatSeed.chat3.chatType;
    firstname = chatSeed.chat3.firstname;
    lastname = chatSeed.chat3.lastname;

    //msg1
    const msg1 = chatSeed.msg1;
    chatId_1 = chatSeed.chat1.chatId;
    type = msg1.type;
    author = msg1.author;
    message = msg1.message;
    sentAt = new Date();
  });

  beforeEach((done) => {
    chatSeed.populateChats().then(
      () => done()
    );
  });

  after(() => {
    expect.restoreSpies();
  });

  describe('insertChat()', () => {
    it('should insert to DB', (done) => {
      Chat.insertChat(chatId_3, chatType, firstname, lastname).then(() => {
        Chat.findOne({ chatId: chatId_3 }).then((chat) => {
          expect(chat).toExist();
          expect(chat.firstname).toBe(chatSeed.chat3.firstname);
          done();
        });
      });
    });
  });


  describe('insertMessage()', () => {
    it('should insert new message and keep old ones', (done) => {
      Chat.insertMessage(chatId_1, type, author, message, sentAt).then(() => {
        Chat.findOne({ chatId: chatId_1 }).then((chat) => {
          expect(chat).toExist();
          expect(chat.messages.length).toBe(3);
          expect(chat.messages[2].message).toBe(message);
          done();
        });
      });
    });
  });

  describe('findChats()', () => {
    it('should return all chats', (done) => {
      Chat.findChats().then((chats) => {
        expect(chats.length).toBe(2);
        done();
      });
    });
  });

  describe('findChatById()', () => {
    it('should return chat messages', (done) => {
      Chat.findChatById(chatId_1).then((chat) => {
        expect(chat.firstname).toBe(chatSeed.chat1.firstname);
        done();
      });
    });
  });

});
