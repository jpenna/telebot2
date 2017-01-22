/* eslint no-undef:off*/

const expect = require('expect');
const web = require('../web/web');
const { io } = require('../server.js');


describe.only('web', () => {
  before(() => {
    author = 'Juliano';
    chatId = 10;
    type = 'user';
    message = 'My message';
    sentAt = new Date().getTime();
    chatType = 'text';
    firstname = 'Juliano';
    lastname = 'Penna';

    emit = expect.spyOn(io, 'emit');

  });

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
    it('should return "undefined" if there is no chats', () => {

    });
    it('should return object with chats object');
    it('should return all messages only for the first chat');
  });

  describe('on(getChatMessages)', () => {
    it('should emit all messages for selected chat');
    it('should not emit any message if there is no chat');
  });

  describe('on(sendTelegram)', () => {
    it('should create postData object (chat_id, text)');
    it('should post to /sendMessage');
    it('should insert message with right params');
  });
});
