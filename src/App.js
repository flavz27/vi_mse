import React, { Component } from 'react';
import './App.css';
import Timeline from './components/Timeline'
import CustomMap from './components/CustomMap'
import ReleasedGames from './components/ReleasedGames'
import Charts from './components/Charts'
import key from './API_KEY.json';


class App extends Component {
  constructor(){
    super();
    this.state={
      API_KEY : key.API_KEY,
      selectedYear: "2014"
    }
  }

  handleSelectedYear = (selectedYearVal) => {
    this.setState({selectedYear: selectedYearVal});
    console.log("changed year")
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Video games and crime</h1>
          <p>lorem ipsum</p>
        </div>
        <Timeline onSelectYear={this.handleSelectedYear}{...this.state} />
        <CustomMap />
        <ReleasedGames {...this.state}/>
        <Charts />
      </div>
    );
  }


}

export default App;
