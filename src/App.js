import React, { Component } from 'react';
import Typography from 'typography';
import theme from 'typography-theme-parnassus';
import {Helmet} from "react-helmet";

import logo from './logo.svg';
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
        <header className="App-header">
          <h1 className="App-title">Watsi's Transparency</h1>
        </header>
      </div>
    );
  }
}

export default App;
