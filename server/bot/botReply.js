const web = require('../web/web');


function send (reply, message) {
  reply.text('Hello!');
  web.sendMessage('Hello!');
}

module.exports = {
  send
}
