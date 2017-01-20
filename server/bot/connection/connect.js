/* Connect to Telegram */
const botgram = require('botgram');

const bot = botgram(process.env.BOT_TOKEN);

module.exports = { bot };

// bot.command("start", "help", function (msg, reply, next) {
//   console.log('Received START');
//   reply.text("To schedule an alert, do: /alert <seconds> <text>");
// });
//
// bot.command("alert", function (msg, reply, next) {
//   var args = msg.args(2);
//   var seconds = Number(args[0]), text = args[1];
//   if (isNaN(seconds) || !text) return next();
//
//   setTimeout(function () {
//     reply.text(text);
//   }, seconds * 1000);
// });
//
// bot.command(function (msg, reply, next) {
//   reply.text("Invalid command.");
// });
