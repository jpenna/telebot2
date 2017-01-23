/* eslint react/prop-types:off, no-undef:off*/

const React = require('react');
const ReactDOM = require('react-dom');
const ChatList = require('./chatsList/ChatList.react');
const MessagesPanel = require('./messagesPanel/MessagesPanel.react');

class ChatRoom extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chats: props.chats.chats,
      activeId: props.chats.activeId
    };

    this.avatarPlaceholder = '/img/mickey.jpg';
    // this.avatarPlaceholder = '/img/avatar-placeholder.png';

    this.changeActive = this.changeActive.bind(this);
    this.newMessage = this.newMessage.bind(this);
    this.insertNewMessage = this.insertNewMessage.bind(this);
    this.insertNewClient = this.insertNewClient.bind(this);
  }

  componentWillMount() {
    window.newChat = (data) => {

      const client = {
        chatId: data.chatId,
        firstname: data.firstname,
        lastname: data.lastname,
        messages: []
      };

      this.insertNewClient(client);
    };

    window.newMessage = (data) => {
      const chatId = data.chatId;
      const author = data.author;
      const type = data.type;
      const text = data.text;
      const sentAt = data.sentAt;

      this.insertNewMessage(chatId, author, type, text, sentAt);
    };
  }

  componentDidMount() {
    this.scrollBottom();
  }

  componentDidUpdate() {
    this.scrollBottom();
  }

  insertNewMessage(chatId, author, type, text, sentAt) {
    const chatMessage = { author, type, text, sentAt };

    const newChat = this.state.chats;
    newChat[chatId].messages.push(chatMessage);

    this.setState({ chats: newChat });
  }

  insertNewClient(clientData) {
    const client = {
      chatId: clientData.chatId,
      firstname: clientData.firstname,
      lastname: clientData.lastname,
      messages: []
    };

    const chats = this.state.chats;
    chats[clientData.chatId] = client;

    this.setState({ chats });
  }
  
  scrollBottom() {
    const messageArea = document.getElementsByClassName('messages-container');
    messageArea[0].scrollTop = messageArea[0].scrollHeight;
  }

  changeActive(id) {
    this.setState({ activeId: id }, this.scrollBottom());
  }

  newMessage(message) {
    const activeChat = this.state.activeId;
    const author = 'Telebot';
    const type = 'client';
    const text = message.message;
    const sentAt = message.sentAt;

    socket.emit('sendTelegram', { type, chatId: activeChat, message: text });

    this.insertNewMessage(activeChat, author, type, text, sentAt);
  }

  render() {
    return (
      <div className="box columns column is-10 is-offset-1 telebot-app">
        <ChatList
          chats={this.state.chats}
          activeId={this.state.activeId}
          changeActive={this.changeActive}
          avatarPlaceholder={this.avatarPlaceholder}
        />
        <MessagesPanel
          chats={this.state.chats}
          activeId={this.state.activeId}
          name={this.state.name}
          newMessage={this.newMessage}
          changeActive={this.changeActive}
          avatarPlaceholder={this.avatarPlaceholder}
        />
      </div>
    );
  }
}

// Get chats
socket.emit('getChats');
socket.on('populateChats', (data) => {

  let initialState = {};
  const chats = {};

  if (!data.chats[0]) {
    // No chats, get NO CHAT message
    document.querySelector('.no-chat').removeAttribute('hidden');

    socket.on('newChat', function () {
      location.reload();
    });

  } else {

    // Populate chats panel and messages
    data.chats.forEach((chat) => {
      chats[chat.chatId] = chat;
    });

    initialState = {
      chats,
      activeId: data.chats[0].chatId,
    };

    require('../../../scripts/socketMethods'); // eslint-disable-line global-require

    ReactDOM.render(
      <ChatRoom chats={initialState} />,
      document.getElementById('container')
    );
  }
});
