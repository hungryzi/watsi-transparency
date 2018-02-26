import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="app__header">
        <div className="header__title">
          <span className="app__watsi">Watsi</span>'s Transparency
          <span
            className="header__faq-link app__action"
            onClick={this.props.openFAQ}
          >
            ¿FAQ?
          </span>
        </div>
        {this.props.children}
      </header>
    );
  }
}

export default Header;
