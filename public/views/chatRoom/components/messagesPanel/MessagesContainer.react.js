/* eslint-disable */

const React = require('react')
const MessageBox = require('./MessageBox.react');

class MessagesContainer extends React.Component {

  render() {

    const messages = this.props.chats[this.props.activeId].messages;

    const conversation = messages.map((msg) => {
      return <MessageBox key={Math.random() * new Date().getTime()} author={msg.author} message={msg.message} sentAt={msg.sentAt} type={msg.type} />

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
