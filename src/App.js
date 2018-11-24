import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from './components/Timeline'
import CustomMap from './components/CustomMap'
import ReleasedGames from './components/ReleasedGames'
import Charts from './components/Charts'


class App extends Component {
  render() {
    return (
      <div className="App">
      <div class="header">
        <h1>Video games and crime</h1>
        <p>lorem ipsum __</p>
      </div>
        <Timeline />
        <CustomMap />
        <ReleasedGames />
        <Charts />
      </div>
    );
  }
}

export default App;
