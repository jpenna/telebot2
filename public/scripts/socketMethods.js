/* eslint no-undef:off, func-names:off*/

// This JS is required in chatRoom.react.js

socket.on('newChat', (chatData) => {

  const chat = {
    chatId: chatData.chatId,
    firstname: chatData.firstname,
    lastname: chatData.lastname,
    messages: []
  };

  window.newChat(chat);

});

socket.on('newMessage', (msgData) => {

  const msg = {
    chatId: msgData.chatId,
    author: msgData.author,
    type: msgData.type,
    text: msgData.message,
    sentAt: msgData.sentAt
  };

  window.newMessage(msg);
});
