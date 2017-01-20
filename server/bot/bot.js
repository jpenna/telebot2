/* Bot app */

const { bot } = require('./connection/connect');
const web = require('../web/web');
const botReply = require('./botReply');
const { db } = require('../utils/db');

const fs = require('fs');
const axios = require('axios');
const https = require('https');

function getUserAvatar(userId) {
  //get user profile photos
  axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUserProfilePhotos`,
    { user_id: userId }).then((res) => {
      const bodyPhotos = res.data;

      if (bodyPhotos.ok) {
        const fileId = bodyPhotos.result.photos[0][0].file_id; //get file_id from last photo 160x160

        //get user profile path
        axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile`,
          { file_id: fileId }).then((res) => {
            const bodyPath = res.data;

            if (bodyPath.ok) {
              const filePath = bodyPath.result.file_path;

              //get user profile image
              const dir = './public/img/avatars'
              !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined; //create folder if don't exists
              const avatar = fs.createWriteStream(`${dir}/${userId}.jpg`);
              https.get(`https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`,
              (res) => {
                res.pipe(avatar);
              });
            } //user photos if
          }).catch(e => console.log('PROFILE PATH:', e));
        } else { //user path if
          return console.log("Couldn't fetch user avatar");
        }
      }).catch(e => console.log('PROFILE PHOTOS:', e));
    }

    //save MongoDB

    //send file to front


    // handles /start command
    bot.command('start', (msg, reply) => {
      const chat = msg.chat;
      getUserAvatar(chat.id);

      web.newChat(chat);
      botReply.send(reply, msg, 'Welcome!');

      // db.insertChat(chat.id, {
      //   type: chat.type,
      //   firstname: chat.firstname,
      //   lastname: chat.lastname,
      // });
    });

    // handles text messages
    bot.text((msg, reply) => {
      const chat = msg.chat;
      console.log(msg);

      const data = {
        chat_id: chat.id,
        author: chat.firstname,
        type: 'client',
        message: msg.text,
        sentAt: new Date().getTime(),
      };

      db.insertMessage(chat.id, data);
      web.sendMessage(data);
      botReply.send(reply, msg, 'Hello!');
    });
