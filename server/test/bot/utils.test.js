/* eslint no-undef:off */

require('../../config/config');
const expect = require('expect');
const https = require('https');
const fs = require('fs');
// const { bot } = require('../../bot/bot');
// const chatSeed = require('../seed/chatSeed');
const utils = require('../../bot/utils');
// const botgramSeed = require('../seed/botgramSeed');
// const botReply = require('../../bot/botReply');
// const web = require('../../web/web');
// const { Chat } = require('../../db/model/chat');
const axios = require('axios');

describe('utils', () => {
  before(() => {
    // Set variables
    fileId = 123;
    filePath = 'xyz';
    dir = './public/img/avatars';
    get1 = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUserProfilePhotos`;
    get2 = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile`;
    get3 = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
    userId = 1;

    // Set spies
    fsSpy = expect.spyOn(fs, 'createWriteStream');
    httpsGetSpy = expect.spyOn(https, 'get');
    axiosGetSpy = expect.spyOn(axios, 'get').andReturn(
      new Promise((resolve) => {
        resolve({
          data: {
            ok: true,
            result: {
              photos: [
                [{ file_id: fileId }]
              ],
              file_path: filePath
            }
          }
        });
      })
    );

    // Call getUserAvatar()
    utils.getUserAvatar(userId);
  });

  after(() => {
    expect.restoreSpies();
  });

  describe('getUserAvatar()', () => {
    it('should get /getUserProfilePhotos', () => {
      expect(axiosGetSpy).toHaveBeenCalled();
      expect(axiosGetSpy.calls[0].arguments).toInclude(get1)
        .toInclude({ params: { user_id: userId } });
    });

    it('should get /getFile', () => {
      expect(axiosGetSpy.calls[1].arguments).toInclude(get2)
        .toInclude({ params: { file_id: fileId } });
    });

    it('should create write stream to /public/img/avatars', () => {
      expect(fsSpy).toHaveBeenCalled();
      expect(fsSpy).toHaveBeenCalledWith(`${dir}/${userId}.jpg`);
    });

    it('should request /file/*/file_path', () => {
      expect(httpsGetSpy).toHaveBeenCalled();
      expect(httpsGetSpy.calls[0].arguments).toInclude(get3);
    });

  });
});
