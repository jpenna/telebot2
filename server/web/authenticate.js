const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const { User } = require('../db/model/user');

const auth = express.Router();

auth.use(bodyParser.urlencoded({ extended: false }));
auth.use(bodyParser.json());
auth.use(cookieParser());

// // var csrf_guid = Guid.raw();
// const meEndpointBaseUrl = ;
// const tokenExchangeBaseUrl = ;

// Check if user can access chatRoom on request
auth.get('/views', (req, res, next) => {

  // Check token cookie
  if (req.cookies && req.cookies.token) {

    // Check token cookie value on DB
    User.findUserByToken(req.cookies.token).then((result) => {
      if (result) {
        const date = new Date().getTime();
        const expiration = new Date(result.expiration_date).getTime();

        // Expiration date on DB must be valid
        if (date < expiration) {
          return next();
        }
        res.set('x-authorization', 'Token expired')
        .redirect(401, '/views/login');


      } else {
        // No user found or token expired
        res.set('x-authorization', 'No user found')
        .redirect(401, '/views/login');

      }
    });

  } else {
    // No cookie token
    res.set('x-authorization', 'No token cookie')
    .redirect(401, '/views/login');
  }

});

// Route for Facebook authentication handlers
auth.post('/sendcode', (request, response) => {

  const appAccessToken = ['AA', process.env.FB_APPID, process.env.FB_APP_SECRET].join('|');
  const params = {
    grant_type: 'authorization_code',
    code: request.body.code,
    access_token: appAccessToken,
  };

  // Exchange tokens
  axios.get(`https://graph.accountkit.com/${process.env.FB_API_VERSION}/access_token`, { params })
  .then((res) => {

    const meParams = {
      access_token: res.data.access_token,
    };

    // Get account details
    axios.get(`https://graph.accountkit.com/${process.env.FB_API_VERSION}/me`, { params: meParams }
    ).then((meRes) => {
      const data = meRes.data;

      const id = data.id;
      const email = data.email.address;
      const token = res.data.access_token;

      // Calculate expiration date in milliseconds
      const expiration = new Date().getTime() + (res.data.token_refresh_interval_sec * 1000);

      User.findUserById(data.id).then((result) => {
        if (!result) {
          // Insert user
          User.insertUser(id, email, token, expiration);
        } else {
          // Remove and insert with new data
          User.removeUser(id);
          User.insertUser(id, email, token, expiration)
          .then(() => {

            // Set cookie for persistent login session
            console.log('setCookie', request.body.code);
            response.cookie('token', token, { expires: new Date(expiration) });

            // Send user to chatRoom page
            response.writeHead(302, {
              Location: 'views/chatRoom',
              'x-auth': res.data.access_token,
            });

            response.end();

          }).catch((err) => { throw new Error('Insert user:', err); });
        }
      }).catch((err) => { throw new Error('Find user by ID:', err); });
    }).catch((err) => { throw new Error('FB /ME ERROR:', err); });
  }).catch((err) => {
    console.log('FB auth:', err);
    response.send('Something went wrong.\nSorry, sir.');
  });
});

module.exports = { auth };
