function getData() {
  const messageObj = {};

  messageObj.start = {
    message_id: 1345,
    from: {
      id: 3,
      first_name: 'Juliano',
      last_name: 'Penna'
    },
    chat: {
      id: 3,
      first_name: 'Juliano',
      last_name: 'Penna',
      type: 'private'
    },
    date: 1485103554,
    text: '/start',
    entities: [{
      type: 'bot_command',
      offset: 0,
      length: 6
    }]
  };

  messageObj.text = {
    message_id: 1349,
    from: {
      id: 1,
      first_name: 'Juliano',
      last_name: 'Penna'
    },
    chat: {
      id: 1,
      first_name: 'Juliano',
      last_name: 'Penna',
      type: 'private'
    },
    date: 1485104036,
    text: 'Zarathustra'
  };

  messageObj.noChat = {
    message_id: 1349,
    from: {
      id: 99,
      first_name: 'Gramps',
      last_name: 'Yoho'
    },
    chat: {
      id: 99,
      first_name: 'Gramps',
      last_name: 'Yoho',
      type: 'private'
    },
    date: 1480104036,
    text: 'Eat this hamburger!'
  };

  return messageObj;
}


module.exports = {
  getData
};
