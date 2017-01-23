/* eslint no-undef:off, react/prop-types:off */


const React = require('react');
const ChatBox = require('./ChatBox.react');

class ChatList extends React.Component {

  logout() {
    const expire = new Date().getTime();
    document.cookie = `token=;path=/;expires=${expire}`;
    location.reload();
  }

  hideContactsPanel() {
    const contactsPanel = document.getElementById('contactsPanel');
    contactsPanel.setAttribute('hidden', '');
  }

  render() {

    const list = [];
    const chatList = this.props.chats;

    // set is-hidden-mobile if it is to be hidden (it shouldn't when menu button is pressed)
    let divClass = 'panel column is-3 chat-list is-hidden-mobile';
    let buttonShow;
    if (this.props.showMobile) {
      divClass = 'panel column is-3 chat-list';
      buttonShow = true;
    }

    for (const key in chatList) {
      const chat = chatList[key];
      const lastKey = chat.messages.length - 1;

      if (chat.messages[lastKey] !== undefined) {
        list.push(
          <ChatBox
            key={key}
            id={+key}
            name={chat.firstname}
            sentAt={chat.messages[lastKey].sentAt}
            lastMessage={chat.messages[lastKey].message}
            activeId={this.props.activeId}
            changeActive={this.props.changeActive}
            avatarPlaceholder={this.props.avatarPlaceholder}
          />
        );
      }
    }

    return (
      <div className={divClass}>
        <p className="panel-heading chat-list-heading">
          <button
            className="no-button menu-button"
            onClick={() => this.logout()}>
            <img
              src="/img/logout-white.svg"
              alt="logout"
              className="header-img"
            />
          </button>
          Contacts
          { buttonShow ?
            <button
              className="no-button menu-button close-contacts"
              onClick={() => this.hideContactsPanel()}>
              &times;
            </button> : ''
          }
        </p>
        <div className="chat-list-overflow">
          {list}
        </div>
      </div>
    );
  }
}

module.exports = ChatList;
