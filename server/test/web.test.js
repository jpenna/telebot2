/* eslint no-undef:off*/

const expect = require('expect');
const web = require('../web/web');
const { io } = require('../server.js');
const chatSeed = require('./seed/chatSeed');
const socket = require('socket.io-client');
const { Chat } = require('../db/model/chat');
const axios = require('axios');

describe('web', () => {
  before(() => {
    // Chat data
    author = 'Juliano';
    chatId = 10;
    type = 'user';
    message = 'My message';
    sentAt = new Date().getTime();
    chatType = 'text';
    firstname = 'Juliano';
    lastname = 'Penna';

    // Socket data
    url = `http://localhost:${process.env.PORT}`;
    options = { transports: ['websocket'], forceNew: true };

    // Seed data
    chat1 = chatSeed.chat1;
    chat2 = chatSeed.chat2;

    // Spys
    emit = expect.spyOn(io, 'emit');
  });

  beforeEach(() => {
    chatSeed.populateChats();
    client1 = socket.connect(url, options);
  });

  after(() => {
    expect.restoreSpies();
  })

  describe('sendMessage()', () => {
    it('should emit "newMessage" with messageData', () => {
      web.sendMessage(chatId, type, author, message, sentAt);

      expect(emit).toHaveBeenCalledWith('newMessage', { chatId, type, author, message, sentAt });
    });
  });

  describe('newChat()', () => {
    it('should emit "newChat" with chatData', () => {
      web.newChat(chatId, chatType, firstname, lastname);

      expect(emit).toHaveBeenCalledWith('newChat', { chatId, chatType, firstname, lastname });
    });
  });

  describe('on(getChats)', () => {
    it('should return "undefined" if there is no chats', (done) => {
      client1.on('connect', () => {
        Chat.remove({}, () => {
          client1.emit('getChats');
        });
      });

      client1.on('populateChats', (data) => {
        expect(data.chats).toEqual([]);
        done();
      });
    });

    it('should return object with chats', (done) => {
      client1.on('connect', () => {
        client1.emit('getChats');
      });

      client1.on('populateChats', (data) => {
        expect(data.chats.length).toBe(2);
        expect(data.chats[0].firstname).toBe(chat1.firstname);
        expect(data.chats[0].messages.length).toBe(2);
        expect(data.chats[0].messages[1].author).toBe(chat2.messages[1].author);
        done();
      });
    });

    it('should return all messages only for the first chat', () => {
      client1.on('connect', () => {
        client1.emit('getChats');
      });

      client1.on('populateChats', (data) => {
        expect(data.chats[0].messages.length).toBe(2);
        expect(data.chats[1].messages.length).toBe(1);
        done();
      });
    });
  });

  describe('on(getChatMessages)', () => {
    it('should emit all messages for selected chat', () => {
      client1.emit('getChatMessages', chat2.chatId);

      client1.on('populateChatMessages', (data) => {
        expect(data.messages.length).toBe(2);
        expect(data.messages[0].author).toBe(chat2.messages[0].author);
        expect(data.messages[1].author).toBe(chat2.messages[1].author);
      });
    });

    it('should not emit any message if there is no chat', () => {
      client1.emit('getChatMessages', 999);

      client1.on('populateChatMessages', (data) => {
        expect(data.messages).toNotExist();
      });
    });
  });

  describe('on(sendTelegram)', () => {
    before(() => {
      // Spy on axios.post()
      postSpy = expect.spyOn(axios, 'post');
      postSpy.andReturn(
        new Promise(resolve => resolve())
      );

      // Set data to on.SendTelegram
      postData = {
        chatId: chat1.chatId,
        message: 'hello'
      };
    });

    it('should create postData object (chat_id, text)', (done) => {

      const checkPost = {
        chat_id: postData.chatId, // Uses chat_id, not chatId
        text: postData.message // Uses text, not message
      };

      client1.emit('sendTelegram', postData, () => {
        expect(postSpy).toHaveBeenCalledWith(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, checkPost);
        done();
      });

    });

    it('should post to /sendMessage', (done) => {
      client1.emit('sendTelegram', postData, () => {
        Chat.findOne({ chatId: postData.chatId }).then((chat) => {
          expect(chat.messages.length).toBe(3);
          expect(chat.messages[2].message).toBe(postData.message);
          done();
        });
      });
    });
  });

});
