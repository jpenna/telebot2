/* eslint react/prop-types:off */

const React = require('react');
const HeaderContainer = require('./HeaderContainer.react');
const MessagesContainer = require('./MessagesContainer.react');
const InputContainer = require('./InputContainer.react');
const ChatList = require('../chatsList/ChatList.react');

const MessagesPanel = function (props) {

  return <div className="column is-9 messages-panel">
    <HeaderContainer
      firstname={props.chats[props.activeId].firstname}
      lastname={props.chats[props.activeId].lastname}
    />
    <MessagesContainer
      chats={props.chats}
      activeId={props.activeId}
      avatarPlaceholder={props.avatarPlaceholder}
    />
    <InputContainer newMessage={props.newMessage} />
    <div id="contactsPanel" className="is-hidden-tablet chat-list-menu" hidden="true">
      <ChatList
        showMobile
        chats={props.chats}
        activeId={props.activeId}
        changeActive={props.changeActive}
        avatarPlaceholder={props.avatarPlaceholder}
      />
    </div>
  </div>;
};

module.exports = MessagesPanel;
