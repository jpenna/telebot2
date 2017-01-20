const fs = require('fs');
const axios = require('axios');
const https = require('https');

const utils = {};

utils.getUserAvatar = (userId) => {
  // get user profile photos
  axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUserProfilePhotos`,
    { user_id: userId }).then((resPrhotos) => {
      const bodyPhotos = resPrhotos.data;

      if (bodyPhotos.ok) {
        // get file_id from last photo 160x160
        const fileId = bodyPhotos.result.photos[0][0].file_id;

        // get user profile path
        axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile`,
          { file_id: fileId }).then((resPath) => {
            const bodyPath = resPath.data;

            if (bodyPath.ok) {
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
                });

            } // user photos if

          }).catch(e => console.log('PROFILE PATH:', e));

      } else { // user path if
        return console.log("Couldn't fetch user avatar");
      }

    }).catch(e => console.log('PROFILE PHOTOS:', e));

};

module.exports = utils;
