import React, { Component } from 'react';
import '../App.css';

class ReleasedGames extends Component {
    constructor(){
        super();
        this.state= {
            games: [],
            releasedGamesYear: []

        };
    }
    componentDidMount(){
        fetch("https://api.mlab.com/api/1/databases/gamessales/collections/games?apiKey="+this.props.API_KEY+"&q={yearOfRelease:"+this.props.selectedYear+"}?s={globalSales: -1}")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              games: result
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

    renderTopReleasedGames(){
    //  console.log(this.state.games)
    var lookup = {};
    var items = this.state.games;
    var releasedGames = [];
    
    for (var item, i = 0; item = items[i++];) {
      var name = item.name;
    
      if (!(name in lookup)) {
        lookup[name] = 1;
        releasedGames.push(name);
      }
    }
    releasedGames = releasedGames.slice(1,11)
      
      this.setState({releasedGamesYear: releasedGames})

      console.log(this.state.releasedGamesYear)
    }
    render(){

        return (
          <div className="gamesContainer"><h2 className="titletwo">Top games of {this.props.selectedYear}</h2>
          <ul className="gamesListYear">
            {this.state.releasedGamesYear.map(game => (
              <li>
               {game}
              </li>
            ))}
          </ul>
          </div>
        );
    }
}

export default ReleasedGames
