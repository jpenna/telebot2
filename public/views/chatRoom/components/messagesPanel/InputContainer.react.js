const React = require('react');

class InputContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.submitMessage = this.submitMessage.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }

  setMessage(e) {
    this.setState({ message: e.target.value });
  }

  submitOnEnter(e) {
    if (e.charCode === 13) {
      this.submitMessage(e);
    }
  }

  submitMessage(e) {
    e.preventDefault();

    const newMessage = {
      message: this.state.message,
      sentAt: new Date(),
    };

    this.setState({ message: '' });

    this.props.newMessage(newMessage);

  }

  render() {
    return (
      <div>
        <div className="columns input-container no-margin-bot">
          <figure className="column is-2 no-flex-grow avatar-figure">
            <img className="avatar-image" src="/img/telebot.jpg"/>
          </figure>

          <div className="column is-10">
            <form id="messageForm" onSubmit={(e) => this.submitMessage(e)}>
              <textarea className="textarea textbox"
                placeholder="Type your message..."
                value={this.state.message}
                onKeyPress={(e) => this.submitOnEnter(e)}
                onChange={(msg) => this.setMessage(msg)}/>
                <span className="send-button-container">
                  <button className="send-button" type="submit">
                    <span className="icon">
                      <i className="fa fa-arrow-right send-arrow"/>
                    </span>
                  </button>
                </span>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }

  module.exports = InputContainer;
