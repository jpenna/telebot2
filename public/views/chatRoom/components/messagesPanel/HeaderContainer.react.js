const React = require('react');

class HeaderContainer extends React.Component {

  render() {
    return (
      <div className="header-container">
        <p className="title is-4 chat-name">{this.props.firstname} {this.props.lastname}</p>
      </div>
    )
  }
}

module.exports = HeaderContainer;
