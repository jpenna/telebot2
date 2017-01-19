require('./config/config');
const express = require('express');
const path = require('path');
const { auth } = require('./web/authenticate');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(auth);

app.use(express.static(path.join(__dirname, '../public')));

// if inexistant path
app.use((req, res) => {
  res.redirect(404, '/views/login');
});

server.listen(3100);

module.exports = { io };

// run bot
require('./bot/bot');
