const fs = require('fs');
const axios = require('axios');
const https = require('https');
const web = require('../web/web');

const utils = {};

utils.getUserAvatar = (userId) => {
  // get user profile photos
  axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUserProfilePhotos`,
    { params: { user_id: userId } }
  ).then((resPrhotos) => { // PROMISE 1
    const bodyPhotos = resPrhotos.data;

    if (bodyPhotos.ok) { // IF 1
      // get file_id from last photo 160x160
      const fileId = bodyPhotos.result.photos[0][0].file_id;

      // get user profile path
      axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile`,
        { params: { file_id: fileId } }
      ).then((resPath) => { // PROMISE 2
        const bodyPath = resPath.data;

        if (bodyPath.ok) { // IF 2
          // get user profile image
          const filePath = bodyPath.result.file_path;

          // create folder if don't exists
          const dir = './public/img/avatars';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          const avatar = fs.createWriteStream(`${dir}/${userId}.jpg`);

          https.get(`https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`,
            (res) => {
              res.pipe(avatar);
            }
          );

        } // end IF 1

      }).catch(e => console.log('PROFILE PATH:', e)); // PROMISE 1

    } else { // end IF 2
      return console.log("Couldn't fetch user avatar");
    }
  }
).catch(e => console.log('PROFILE PHOTOS:', e)); // PROMISE 2

};

module.exports = utils;
