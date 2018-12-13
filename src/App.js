import React, { Component } from 'react';
import './App.css';
import Timeline from './components/Timeline'
import CustomMap from './components/CustomMap'
import ReleasedGames from './components/ReleasedGames'
import Charts from './components/Charts'
import key from './API_KEY.json';


class App extends Component {
  constructor() {
    super();

    this.state = {
      API_KEY: key.API_KEY,
      selectedYear: "2014",
      gamesSales: {},
      crimes: {},
      releasedGamesYear: [],
      gamesLoaded: false,
      crimesLoaded: false,
      changedYear: false,
      selectedRegion:"AMERICA"
    }
    this.fetchGames()
    this.fetchCrimes()
  }

  handleSelectedYear = (selectedYearVal) => {
    this.setState({ selectedYear: selectedYearVal, changedYear: true });

  }

  handleUpdateGames = (something) => {

  }
  componentDidMount() {

  }
  componentDidUpdate() {

  }

  fetchGames() {
    fetch("https://api.mlab.com/api/1/databases/gamessales/collections/games?apiKey=" +
      this.state.API_KEY + "&?s={globalSales: -1}")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            gamesLoaded: true,
            gamesSales: result
          });

        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log("error from api")
        }
      )
  }

  fetchCrimes() {
    fetch("https://api.mlab.com/api/1/databases/gamessales/collections/crimes?apiKey=" +
      this.state.API_KEY)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            crimesLoaded: true,
            crimes: result
          });

        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log("error from api")
        }
      )
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Video games and crime</h1>
          <p>lorem ipsum</p>
        </div>
        <Timeline onSelectYear={this.handleSelectedYear} {...this.state} />
        <CustomMap />
        {
          this.state.gamesLoaded &&
          <ReleasedGames
            gamesSales={this.state.gamesSales}
            selectedYear={this.state.selectedYear}
            changedYear={this.state.changedYear}
          />
        }
        {
          this.state.crimesLoaded && this.state.gamesLoaded &&
          <Charts crimes={this.state.crimes} 
                  selectedRegion={this.state.selectedRegion}
                  gamesSales={this.state.gamesSales}/>
        }
      </div>
    );
  }




}

export default App;
