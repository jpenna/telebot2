/* Connect to Telegram */
const botgram = require('botgram');

const bot = botgram(process.env.BOT_TOKEN);

module.exports = { bot };
