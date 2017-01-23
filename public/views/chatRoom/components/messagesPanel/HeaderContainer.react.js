/* eslint react/prop-types:off */

const React = require('react');

class HeaderContainer extends React.Component {

  openContacts() {
    const contactsPanel = document.getElementById('contactsPanel');
    contactsPanel.removeAttribute('hidden');
  }

  render() {
    return (
      <div className="header-container">
        <p className="title is-4 chat-name">
          <button
            id="menuButton"
            className="no-button menu-button is-hidden-tablet"
            onClick={() => this.openContacts()} >
            <img src="/img/menu.svg" className="header-img menu-img" alt="Menu" />
          </button>
          {this.props.firstname} {this.props.lastname}
        </p>
      </div>
    );
  }
}

module.exports = HeaderContainer;
