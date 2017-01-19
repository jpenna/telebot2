// const fs = require('fs');
// const Guid = require('guid');
const express = require('express');
const bodyParser = require('body-parser');
// const Mustache  = require('mustache');
const axios = require('axios');
// const Querystring = require('querystring');

const auth = express.Router();

auth.use(bodyParser.urlencoded({ extended: false }));
auth.use(bodyParser.json());

// var csrf_guid = Guid.raw();
// const apiVersion = 'v1.1';
const appId = '1647210538911602';
const appSecret = '3d81a108d5a824f04f579ba078a73d77';
const meEndpointBaseUrl = 'https://graph.accountkit.com/v1.1/me';
const tokenExchangeBaseUrl = 'https://graph.accountkit.com/v1.1/access_token';

// SERVE LOGIN PAGE
// function loadLogin() {
//   return fs.readFileSync('dist/login.html').toString();
// }

// auth.get('/', function(request, response){
//   var view = {
//     appId: appId,
//     csrf: csrf_guid,
//     version: account_kit_api_version,
//   };
//
//   var html = Mustache.to_html(loadLogin(), view);
//   response.send(html);
// });

// function loadLoginSuccess() {
//   return fs.readFileSync('dist/login_success.html').toString();
// }

// SUCCESSFUL LOGIN

auth.post('/', (request, response) => {
  // console.log('code: ', request.body.code);

  // CSRF check
  // if (request.body.csrf_nonce === csrf_guid) {
  const appAccessToken = ['AA', appId, appSecret].join('|');
  const params = {
    grant_type: 'authorization_code',
    code: request.body.code,
    access_token: appAccessToken,
  };

  // exchange tokens
  axios.get(tokenExchangeBaseUrl, { params })
  .then((res) => {
    // var view = {
    // user_access_token: res.access_token,
    // expires_at: respBody.expires_at,
    // user_id: respBody.id,
    // };
    // console.log(res.access_token);
    // get account details at /me endpoint
    const meParams = {
      access_token: res.data.access_token,
    };

    console.log('token exchange res', res);
    console.log('*******************\nME PARAMS', meParams);


    // var meEndpointBaseUrl = me_endpoint_base_url + '?access_token=' + respBody.access_token;
    axios.get(meEndpointBaseUrl, { params: meParams }).then((meRes) => {
      // send login_success.html
      // if (respBody.phone) {
      //   view.phone_num = respBody.phone.number;
      // } else if (respBody.email) {
      //   view.email_addr = respBody.email.address;
      // }
      // var html = Mustache.to_html(loadLoginSuccess(), view);
      // response.send('passou');
      console.log(meRes);
      response.writeHead(302, {
        Location: 'views/chatRoom',
        'x-auth': res.access_token,
      });

      response.end();
    }).catch(err => console.log('me ERROR', err));

  }).catch(err => console.log('token exchange ERROR', err));
});
// }
// else {
//   // login failed
//   response.writeHead(200, {'Content-Type': 'text/html'});
//   response.end("Something went wrong. :( ");
// }
// });

module.exports = { auth };
