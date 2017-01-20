/* eslint no-undef:off, func-names:off*/

// This JS is required in chatRoom.react.js

socket.on('newChat', (chatData) => {

  const chat = {
    chatId: chatData.chat_id,
    first_name: chatData.firstname,
    last_name: chatData.lastname,
    messages: []
  };

  window.newChat(chat);

});

socket.on('newMessage', (msgData) => {

  const msg = {
    chatId: msgData.chat_id,
    author: msgData.author,
    type: msgData.type,
    text: msgData.message,
    sentAt: msgData.sentAt
  };

  window.newMessage(msg);
});
