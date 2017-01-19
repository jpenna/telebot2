require('./config/config');
const express = require('express');
const path = require('path');
const { auth } = require('./web/authenticate');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// app.use((req, res, next) => {
//   console.log(req.path);
//   next();
// });

app.use('/sendcode', auth);

// app.use((req,res,next) => {console.log(req.path, req.url); next();});
app.use(express.static(path.join(__dirname, '../public')));


server.listen(3100);

module.exports = { io };

// run bot
require('./bot/bot');
