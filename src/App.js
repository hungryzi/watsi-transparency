import React, { Component } from 'react';
import Typography from 'typography';
import theme from 'typography-theme-st-annes';
import {Helmet} from "react-helmet";

import { FAQ, Header, Map, Nav } from './components';
import './App.css';

const typography = new Typography(theme);

function toFilterString(year, month) {
  return month > 9 ? `${year}-${month}` : `${year}-0${month}`;
}

class App extends Component {
  constructor(props) {
    super(props);

    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.state = {
      selectedMonth: toFilterString(year, month),
      isFAQopen: false,
    }
  }

  filterByMonth(month) {
    this.setState({ selectedMonth: month });
  }

  openFAQ() {
    console.log('open')
    this.setState({ isFAQopen: true });
  }

  closeFAQ() {
    console.log('close')
    this.setState({ isFAQopen: false });
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Watsi's Transparency</title>
          <style>{typography.toString()}</style>
        </Helmet>
        <Header
          openFAQ={this.openFAQ.bind(this)}
        >
          <Nav
            selectedMonth={this.state.selectedMonth}
            filterByMonth={this.filterByMonth.bind(this)}
          />
        </Header>
        <FAQ
          isOpen={this.state.isFAQopen}
          onClose={this.closeFAQ.bind(this)}
        />
        <Map
          month={this.state.selectedMonth}
        ></Map>
      </div>
    );
  }
}

export default App;
