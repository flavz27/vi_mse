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
      selectedYear: "2015",
      gamesSales: {},
      crimes: {},
      releasedGamesYear: {},
      gamesLoaded: false,
      crimesLoaded: false,
      changedYear: false,
      selectedRegion:"AMERICA",
      selectedCoordinates:{
        long: -103.825761, 
        lat: 38.298146
      },
      coordinatesTable:{
        "ASIA":{
          long: 138.041361, 
          lat: 35.834017 
        },
        "EUROPE":{
          long: 138.041361, 
          lat: 35.834017
        }
      }
    }
    this.fetchGames()
    this.fetchCrimes()
    
  }

  handleSelectedYear = (selectedYearVal) => {
    this.setState({ selectedYear: selectedYearVal, changedYear: true });
    this.renderTopReleasedGames()
  }

  handleSelectedRegion = (selectedRegionVal) => {
    this.setState({ selectedRegion: selectedRegionVal })
    this.setState({selectedCoordinates:this.state.coordinatesTable.selectedRegionVal})
    //console.log("coordinates:",this.state.selectedCoordinates)
  }

  handleUpdateGames = (something) => {

  }
  componentDidMount() {

  }
  componentDidUpdate() {

  }

  renderTopReleasedGames() {
   
    const filteredGames = new Set();

    for (let i = 0; i < this.state.gamesSales.length; i++) {
      if (this.state.gamesSales[i].yearOfRelease == this.state.selectedYear) {

        filteredGames.add(this.state.gamesSales[i].name);
      }
    }

  
    this.setState({ releasedGamesYear: [...filteredGames].slice(0, 5) })


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
          this.renderTopReleasedGames()
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
          <p>Is there a correlation between video games and violence ? Let's find out using data. We will be using game sales numbers and crime statistics.</p>
        </div>
        <Timeline onSelectYear={this.handleSelectedYear} {...this.state} />
        <CustomMap  selectedCoordinates={this.state.selectedCoordinates} />
        {
          this.state.gamesLoaded && this.state.releasedGamesYear &&
          <ReleasedGames
           
            releasedGamesYear={this.state.releasedGamesYear}
            selectedYear={this.state.selectedYear}
            changedYear={this.state.changedYear}
          />
        }
        {
          this.state.crimesLoaded && this.state.gamesLoaded &&
          <Charts onSelectRegion={this.handleSelectedRegion}
                crimes={this.state.crimes} 
                  selectedRegion={this.state.selectedRegion}
                   gamesSales={this.state.gamesSales}
                   selectedYear={this.state.selectedYear}/>
        }
      </div>
    );
  }




}

export default App;
