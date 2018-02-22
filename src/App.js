import React, { Component } from 'react';
import Typography from 'typography';
import theme from 'typography-theme-parnassus';
import {Helmet} from "react-helmet";

import { Header, Map, Nav } from './components';
import './App.css';

const typography = new Typography(theme);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Watsi's Transparency</title>
          <style>{typography.toString()}</style>
        </Helmet>
        <Header></Header>
        <Nav></Nav>
        <Map></Map>
      </div>
    );
  }
}

export default App;
