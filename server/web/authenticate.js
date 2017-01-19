const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const auth = express.Router();

auth.use(bodyParser.urlencoded({ extended: false }));
auth.use(bodyParser.json());

// var csrf_guid = Guid.raw();
// const apiVersion = 'v1.1';
const appId = '1647210538911602';
const appSecret = '3d81a108d5a824f04f579ba078a73d77';
const meEndpointBaseUrl = 'https://graph.accountkit.com/v1.1/me';
const tokenExchangeBaseUrl = 'https://graph.accountkit.com/v1.1/access_token';


auth.post('/', (request, response) => {

  const appAccessToken = ['AA', appId, appSecret].join('|');
  const params = {
    grant_type: 'authorization_code',
    code: request.body.code,
    access_token: appAccessToken,
  };

  // exchange tokens
  axios.get(tokenExchangeBaseUrl, { params })
  .then((res) => {
    console.log('data', res.data);
    console.log('id', res.data.id);

    const meParams = {
      access_token: res.data.access_token,
    };

    // get account details
    axios.get(meEndpointBaseUrl, { params: meParams })
    .then((meRes) => {
      const data = meRes.data;
      // register user on db

      console.log(data);

      response.writeHead(302, {
        Location: 'views/chatRoom',
        'x-auth': res.data.access_token,
      });

      response.end();

    }).catch(err => console.log('me ERROR', err));
  }).catch((err) => {
    console.log('token exchange ERROR', err);
    response.send('Something went wrong.\nNo login for you.');
  });
});

module.exports = { auth };
