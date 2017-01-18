/* eslint-disable */


const React = require('react');

class ChatBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      buttonClass: null,
    };

    this.changeActive = this.changeActive.bind(this);

  }

  changeActive(id) {
    this.props.changeActive(id);
  }

  changeClass() {
    const isThisActive = this.props.activeId === this.props.id;

    let buttonClass = 'panel-block no-button preview-button';
    isThisActive ? buttonClass += ' active-chat' : '';

    this.state.buttonClass = buttonClass;
  }

  render() {
    this.changeClass();

    let sentAt;

    const today = new Date().setHours(0, 0, 0, 0);
    const sendDate = new Date(this.props.sentAt).setHours(0, 0, 0, 0);

    if (today == sendDate) {
      sentAt = new Date(this.props.sentAt).toLocaleString("pt-BR", {
        hour: 'numeric',
        minute: 'numeric',
      });
    } else if (today - sendDate < 86401000) {
      sentAt = "Ontem";
    } else if (today - sendDate < 7*86401000) {
      sentAt = new Date(this.props.sentAt).toLocaleString("pt-BR", {
        weekday: 'short',
      });

      sentAt = sentAt.charAt(0).toUpperCase() + sentAt.slice(1);

    } else {
      sentAt = new Date(this.props.sentAt).toLocaleString("pt-BR", {
        day: 'numeric',
        month: 'numeric',
      });
    }

    return (
      <button className={this.state.buttonClass}
        onClick={() => this.changeActive(this.props.id)}>
        <div className="media">
          <figure className="media-left">
            <p className="image is-64x64 is-50x50">
              <img className="avatar-image" src="/img/avatar-placeholder.png"/>
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <div className="level">
                <div className="level-left">
                  <p className="level-item preview-name">{this.props.name}</p>
                </div>
                <div className="level-right">
                  <small className="level-item preview-time">{sentAt}</small>
                </div>
              </div>
              <p className="preview-text">{this.props.lastMessage}</p>
            </div>
          </div>
        </div>
      </button>
    )
  }
}

module.exports = ChatBox;
