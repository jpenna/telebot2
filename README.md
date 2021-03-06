# Telebot
Chatbot for Telegram.

## Quick Start

1. Start MongoDB
2. Set the configuration variables at `config.json`
3. Run `npm start` from root path
4. Access `/views/login` over a HTTPS protocol (try **ngrok** for tunneling)
5. Login (set Facebook Account Kit Server URLs to allow the HTTPS address you are using)
6. Talk

### Configuration

Configuration variables are set in **config.json**.

Use the `config-sample.json` to set your variables and rename it to `config.json`.

`dev`: for development variables

`test`: for test variables

`default` for shared environment variables
````
{
  "dev": {
    "MONGODB_URI": *** DEV DB ***
  },

  "test": {
    "MONGODB_URI": *** TEST DB ***
  },

  "default": {
    "PORT": // set your port,

    "BOT_TOKEN": // get it in you telegram bot,

    "FB_API_VERSION": // from Facebook API, not Account Kit API,
    "FB_APPID": // from Facebook API, not Account Kit API,
    "FB_APP_SECRET": // from Account Kit API
  }
}
````

## Tests

To run tests enter `npm test` or `npm run test-watch` (nodemon watch).

---

### Next Steps

- [ ] User Docker

---
### Refs
ngrok: https://ngrok.com/

Create Telegram bot: https://core.telegram.org/bots#3-how-do-i-create-a-bot
