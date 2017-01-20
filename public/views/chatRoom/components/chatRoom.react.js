/* eslint-disable */
const React = require('react');
const ReactDOM = require('react-dom');
const ChatList = require('./chatsList/ChatList.react');
const MessagesPanel = require('./messagesPanel/MessagesPanel.react');

class ChatRoom extends React.Component {

  constructor(props) {
    super(props);

    // this.socket = socket;

    this.state = {
      chats: props.chats.chats,
      activeId: props.chats.activeId,
    }

    this.changeActive = this.changeActive.bind(this);
    this.newMessage = this.newMessage.bind(this);
    this.insertNewMessage = this.insertNewMessage.bind(this);
    this.insertNewClient = this.insertNewClient.bind(this);
  }

  insertNewMessage(chatId, author, type, text, sentAt) {
    const chatMessage = {
      author: author,
      type: type,
      message: text,
      sentAt: sentAt
    }

    const newChat = this.state.chats;
    newChat[chatId].messages.push(chatMessage);

    this.setState({chats: newChat})
  }

  insertNewClient(clientData) {

    const client = {
      chat_id: clientData.chatId,
      firstname: clientData.firstname,
      lastname: clientData.lastname,
      avatar: clientData.avatar,
      messages: []
    }

    const chats = this.state.chats;
    chats[clientData.chatId] = client;

    this.setState({chats: chats});

  }

  componentWillMount() {
    window.newUser = (data) => {

      const client = {
        chatId: data.chat_id,
        firstname: data.firstname,
        lastname: data.lastname,
        avatar: data.avatar,
        messages: []
      }

      this.insertNewClient(client)

    }

    window.newMessage = (data) => {

      const chatId = data.chatId;
      const author = data.author;
      const type = data.type;
      const text = data.text;
      const sentAt = data.sentAt;

      this.insertNewMessage(chatId, author, type, text, sentAt)

    };


  }

  componentDidMount() {
    this.scrollBottom();
  }

  componentDidUpdate() {
    this.scrollBottom();
  }

  changeActive(id) {
    this.setState({activeId: id}, this.scrollBottom())
  }

  //  TODO take it out of here
  newMessage(message) {

    const activeChat = this.state.activeId;
    const author = 'Telebot';
    const type = 'user';
    const text = message.message;
    const sentAt = message.sentAt;

    socket.emit('sendTelegram', {chat_id: activeChat, type: type, message: text});

    this.insertNewMessage(activeChat, author, type, text, sentAt);

  }

  scrollBottom() {
    var messageArea = document.getElementsByClassName("messages-container");
    messageArea[0].scrollTop = messageArea[0].scrollHeight;
  }

  render() {
    return (
      <div className="box columns column is-10 is-offset-1 telebot-app">
        <ChatList chats={this.state.chats} activeId={this.state.activeId} changeActive={this.changeActive}/>
        <MessagesPanel chats={this.state.chats} activeId={this.state.activeId} name={this.state.name}
          newMessage={this.newMessage} changeActive={this.changeActive}/>
      </div>
    )
  }
}

socket.emit('getChats');
socket.on('populateChats', (data) => {

  const chats = {};

  data.chats.forEach((chat, key) => {
    chats[chat.chat_id] = chat;
  });

  const initialState = {
    activeId: data.chats[0].chat_id,
    chats
  };

  ReactDOM.render(
    <ChatRoom chats={initialState} />,
    document.getElementById('container')
  );
});
