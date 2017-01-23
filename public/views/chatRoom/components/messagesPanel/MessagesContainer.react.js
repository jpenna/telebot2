/* eslint react/prop-types:off */

const React = require('react');
const MessageBox = require('./MessageBox.react');

const MessagesContainer = function (props) {

  const thisChat = props.chats[props.activeId];

  const chatId = thisChat.chatId;
  const messages = thisChat.messages;

  const conversation = messages.map(msg =>
    <MessageBox
      key={Math.random() * new Date().getTime()}
      author={msg.author}
      message={msg.message}
      sentAt={msg.sentAt}
      type={msg.type}
      id={chatId}
      avatarPlaceholder={props.avatarPlaceholder}
    />
  );

  return <div className="panel messages-container">
    <div className="panel-block column is-offset-1 message-box">
      {conversation}
    </div>
  </div>;
};

module.exports = MessagesContainer;
