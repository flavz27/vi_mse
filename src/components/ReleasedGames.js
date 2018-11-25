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
        fetch("https://api.mlab.com/api/1/databases/gamessalestests/collections/games?apiKey="+this.props.API_KEY)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.items
            });
            console.log("ok");
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
    render(){
        return(
            <div className="gamesContainer">ReleasedGames</div>
        )
       
    }


}


export default ReleasedGames