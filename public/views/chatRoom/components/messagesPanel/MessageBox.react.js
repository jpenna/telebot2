const React = require('react');

class MessagesSpace extends React.Component {

  render() {

    let sentAt;

    let today = new Date().setHours(0, 0, 0, 0);
    let sendDate = new Date(this.props.sentAt).setHours(0, 0, 0, 0);

    if (today == sendDate) {
      sentAt = new Date(this.props.sentAt).toLocaleString("pt-BR", {
        hour: 'numeric',
        minute: 'numeric'
      })
    } else if (today - sendDate < 86401000) {
      sentAt = "Ontem"
    } else if (today - sendDate < 7 * 86401000) {
      sentAt = new Date(this.props.sentAt).toLocaleString("pt-BR", {
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric'
      });

      sentAt = sentAt.charAt(0).toUpperCase() + sentAt.slice(1)

    } else {
      sentAt = new Date(this.props.sentAt)

      let days = sentAt.toLocaleString("pt-BR", {
        day: 'numeric',
        month: 'numeric'
      });

      let time = sentAt.toLocaleString("pt-BR", {
        hour: 'numeric',
        minute: 'numeric',
      });

      sentAt = days + ', ' + time
    }

    const isOrange = this.props.type == 'client' ? 'is-orange' : '';
    const nameStyle = `${isOrange} level-item client-name`;

    return (

      <div className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img className="avatar-image" src="/img/avatar-placeholder.png"/>
          </p>
        </figure>
        <div className="media-content msg-context">
          <div className="content">
            <div className="level message-info">
              <div className="level-left">
                <p className={nameStyle}>{this.props.author}</p>
                {this.props.type == "bot" && <span className="tag is-dark-blue bot-small">BOT</span>}
              </div>
              <div className="level-right">
                <small className="level-item">{sentAt}</small>
              </div>
            </div>
            <p className="message-text">{this.props.message}</p>
          </div>
        </div>
      </div>

    )
  }
}

module.exports = MessagesSpace;