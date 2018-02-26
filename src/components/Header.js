import React, { Component } from 'react';

class Header extends Component {
  render() {
    return <header className="App-header">
            <div className="header__title">
              <span className="header__brand">Watsi</span>'s Transparency
            </div>
            {this.props.children}
          </header>;
  }
}

export default Header;
