# Telebot
Chatbot for Telegram.

## Quick Start

1. Start MongoDB
2. Set the configuration variables at `config.json`
3. Run `npm start` from root path
4. Access `/views/login` with a HTTPS protocol (try **ngrok** for tunneling)
5. Login
6. Talk

### Configuration

Configuration variables are set in config.json, which has:

a `dev` property for development variable,

a `test` property for test variables

and `default` property for shared environment variables.
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
---

### Next Steps

- [ ] User Docker

---
### Refs
ngrok: https://ngrok.com/

Create Telegram bot: https://core.telegram.org/bots#3-how-do-i-create-a-bot
