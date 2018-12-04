import React, { Component } from 'react';
import '../App.css';

class ReleasedGames extends Component {
    constructor(){
        super();
        this.state= {
            games: []

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
      this.state.games.sort()
      console.log(this.state.games)
    }
    render(){
        return(
            <div className="gamesContainer">ReleasedGames</div>
        )

    }


}


export default ReleasedGames
