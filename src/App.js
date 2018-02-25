import React, { Component } from 'react';
import Typography from 'typography';
import theme from 'typography-theme-st-annes';
import {Helmet} from "react-helmet";

import { Header, Map, Nav } from './components';
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
    this.state = { selectedMonth: toFilterString(year, month) }
  }

  filterByMonth(month) {
    this.setState({ selectedMonth: month });
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Watsi's Transparency</title>
          <style>{typography.toString()}</style>
        </Helmet>
        <Header></Header>
        <Nav
          selectedMonth={this.state.selectedMonth}
          filterByMonth={this.filterByMonth.bind(this)}
        ></Nav>
        <Map
          month={this.state.selectedMonth}
        ></Map>
      </div>
    );
  }
}

export default App;
