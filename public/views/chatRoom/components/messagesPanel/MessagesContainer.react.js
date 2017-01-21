/* eslint-disable */

const React = require('react')
const MessageBox = require('./MessageBox.react');

class MessagesContainer extends React.Component {

  render() {
    const thisChat = this.props.chats[this.props.activeId];

    const chatId = thisChat.chatId;
    const messages = thisChat.messages;

    const conversation = messages.map((msg) => {
      return <MessageBox key={Math.random() * new Date().getTime()} author={msg.author} message={msg.message} sentAt={msg.sentAt} type={msg.type} id={chatId} avatarPlaceholder={this.props.avatarPlaceholder}/>

    });

    return (
      <div className="panel messages-container">
        <div className="panel-block column is-offset-1 message-box">
          {conversation}
        </div>
      </div>
    );
  }
}

module.exports = MessagesContainer;
