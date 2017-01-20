const React = require('react');
const HeaderContainer = require('./HeaderContainer.react');
const MessagesContainer = require('./MessagesContainer.react');
const InputContainer = require('./InputContainer.react');
const ChatList = require('../chatsList/ChatList.react');

class MessagesPanel extends React.Component {

  render() {
    return (
      <div className="column is-9 messages-panel">
        <HeaderContainer firstname={this.props.chats[this.props.activeId].firstname}
          lastname={this.props.chats[this.props.activeId].lastname} />
        <MessagesContainer chats={this.props.chats} activeId={this.props.activeId}/>
        <InputContainer newMessage={this.props.newMessage} />
        <div id="contactsPanel" className="is-hidden-tablet chat-list-menu" hidden="true">
          <ChatList
            chats={this.props.chats} activeId={this.props.activeId}
            showMobile={true}
            changeActive={this.props.changeActive}
          />
        </div>
      </div>
    )
  }
}

  module.exports = MessagesPanel;
