/* eslint no-undef:off */

require('../config/config');
const expect = require('expect');
const { bot } = require('../bot/bot');
const chatSeed = require('./seed/chatSeed');
const utils = require('../bot/utils');
const botgramSeed = require('./seed/botgramSeed');
const botReply = require('../bot/botReply');
const web = require('../web/web');
const { Chat } = require('../db/model/chat');


describe('bot', () => {
  before(() => {
    // Set spys
    replySpy = expect.spyOn(botReply, 'send');
    avatarSpy = expect.spyOn(utils, 'getUserAvatar');
    sendSpy = expect.spyOn(web, 'sendMessage');

    // Get data
    messageObj = botgramSeed.getData();
    // Set data
    const start = messageObj.start.chat;
    startId = start.id;
    startName = start.first_name;
    startType = 'user'; // Set by botgram
    startLast = start.last_name;

    const text = messageObj.text;
    textId = text.chat.id;
    textType = 'user';
    textName = text.chat.first_name;
    textMessage = text.text;
    textSentAt = new Date(text.date * 1000).toISOString(); // Response in Unix format (sec)

    const noChat = messageObj.noChat;
    noChatId = noChat.chat.id;
    noChatType = 'user';
    noChatName = noChat.chat.first_name;
    noChatMessage = noChat.text;
    noChatSentAt = new Date(noChat.date * 1000).toISOString(); // Response in Unix format (sec)
  });

  beforeEach((done) => {
    // Refresh data
    messageObj = botgramSeed.getData();
    // Populate chats collection
    chatSeed.populateChats().then(() => done());
  });


  describe('/start', () => {
    beforeEach(() => {
      bot.processMessage(messageObj.start);
    });

    it('should create chat in DB', (done) => {
      setTimeout(() => {
        Chat.findOne({ chatId: startId }).then((chat) => {
          expect(chat.firstname).toBe(startName);
          done();
        });
      }, 100);
    });

    it('should send new chat to web', (done) => {
      const newChatSpy = expect.spyOn(web, 'newChat');
      setTimeout(() => {
        expect(newChatSpy).toHaveBeenCalled();
        expect(newChatSpy).toHaveBeenCalledWith(startId, startType, startName, startLast);
        done();
      }, 100);
    });

    it('should reply to user', () => {
      setTimeout(() => {
        expect(replySpy).toHaveBeenCalled();
      }, 100);
    });

    it('should request user avatar', () => {
      expect(avatarSpy).toHaveBeenCalledWith(startId);
    });
  });

  describe('/text', () => {
    describe('with existant Chat', () => {
      before(() => {
        // Expect newChat isn't called
        newChatSpy = expect.spyOn(Chat, 'insertChat');
      });


      beforeEach(() => {
        // Process TEXT message
        bot.processMessage(messageObj.text);
      });

      after(() => {
        // Reset newChat behavior
        newChatSpy.restore();
      });

      it('should save message in DB', (done) => {
        setTimeout(() => {
          Chat.findOne({ chatId: chatSeed.chat1.chatId }).then((chat) => {
            expect(chat.messages.length).toBe(3);
            expect(chat.messages[2].message).toBe(textMessage);
            expect(newChatSpy).toNotHaveBeenCalled();
            done();
          });
        }, 100);
      });

      it('should send message to web', (done) => {

        setTimeout(() => {
          expect(sendSpy).toHaveBeenCalled();
          expect(sendSpy).toHaveBeenCalledWith(
            textId, textType, textName, textMessage, new Date(textSentAt)
          );
          expect(newChatSpy).toNotHaveBeenCalled();
          done();
        }, 100);
      });

      it('should reply to user', (done) => {
        setTimeout(() => {
          expect(replySpy).toHaveBeenCalled();
          expect(newChatSpy).toNotHaveBeenCalled();
          done();
        }, 100);
      });
    });

    describe('NO previous chat', () => {
      beforeEach(() => {
        // Process NO CHAT message
        bot.processMessage(messageObj.noChat);
      });

      it('should create chat if inexistant and save message', (done) => {
        setTimeout(() => {
          Chat.findOne({ chatId: noChatId }).then((chat) => {
            expect(chat).toExist();
            expect(chat.messages.length).toBe(1);
            expect(chat.messages[0].message).toBe(noChatMessage);
            done();
          });
        }, 100);
      });

      it('should send message after create inexistant chat', (done) => {
        setTimeout(() => {
          expect(sendSpy).toHaveBeenCalled();
          expect(sendSpy).toHaveBeenCalledWith(
            noChatId, noChatType, noChatName, noChatMessage, new Date(noChatSentAt)
          );
          done();
        }, 100);
      });

    });
  }); // describe(text)
}); // describe(bot)

describe('botReply', () => {
  describe('send()', () => {
    it('should reply client with msg param');
    it('should send message to web');
    it('should save message in db');
  });
});

describe('utils', () => {
  describe('getUserAvatar()', () => {
    it('should post /getUserProfilePhotos and return UserProfilePhotos obj (file_id, *_size, *_path)');
    it('should post /getFile and return file_path');
    it('should create write stream to /public/img/avatars');
    it('should request /file/*/file_path and pipe response');
  });
});
