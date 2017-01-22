/* eslint no-undef:off */

require('../../config/config');
const expect = require('expect');
const chatSeed = require('../seed/chatSeed');
const botReply = require('../../bot/botReply');
const web = require('../../web/web');
const { Chat } = require('../../db/model/chat');

describe('botReply', () => {
  after(() => {
    expect.restoreSpies();
  })

  describe('send()', () => {

    before(() => {
      // Set variables
      reply = { text(x) {} };
      botAPIMsg = { chat: { id: chatSeed.chat1.chatId } };
      msg = 'Something';

      author = 'Telebot';
      type = 'bot';
      chatId = botAPIMsg.chat.id;
      message = msg;

      // Set spies
      replySpy = expect.spyOn(reply, 'text');
      sendMsgSpy = expect.spyOn(web, 'sendMessage');
    });

    beforeEach((done) => {
      // Populate chats to insert message
      chatSeed.populateChats().then(() => {
        // Execute send()
        botReply.send(reply, botAPIMsg, msg);
        done();
      });
    });

    it('should reply client with msg param', () => {
      expect(replySpy).toHaveBeenCalled();
      expect(replySpy).toHaveBeenCalledWith(msg);
    });

    it('should send message to web', () => {
      expect(sendMsgSpy).toHaveBeenCalled();
      expect(sendMsgSpy.calls[0].arguments).toInclude(chatId, type, author, message);
    });

    it('should save message in db', (done) => {
      setTimeout(() => {
        Chat.findOne({ chatId }).then((chat) => {
          expect(chat).toExist();
          expect(chat.messages.length).toBe(3);
          expect(chat.messages[2].message).toBe(msg);
          done();
        });
      }, 300);
    });

  });
});
