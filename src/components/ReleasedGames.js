import React, { Component } from 'react';
import '../App.css';

class ReleasedGames extends Component {

  constructor(props) {
    super(props);
    //  this.changedYear = this.changedYear.bind(this);
    // this.state = {
    //   releasedGamesYear: []
    // };

    const timesupdated = 0;
  }

  componentDidUpdate() {

    console.log(this.props.selectedYear)

  }

  componentDidMount() {
    // this.renderTopReleasedGames();
  }

  // componentDidCatch() {
  //   console.log("catch");
  // }

  renderTopReleasedGames() {
    console.log("render top released games")
    // const filteredGames = new Set();

    // for (let i = 0; i < this.props.gamesSales.length; i++) {
    //   if (this.props.gamesSales[i].yearOfRelease == this.props.selectedYear) {

    //     filteredGames.add(this.props.gamesSales[i].name);
    //   }
    // }

    // this.setState({ releasedGamesYear: [...filteredGames].slice(0, 5) })
  }

  render() {
    console.log("in render", this.props.releasedGamesYear)
    return (
      <div className="gamesContainer"><h2 className="titletwo">Top 5 games of {this.props.selectedYear}</h2>

        <ul className="gamesListYear">
          {
            this.props.releasedGamesYear &&
            <div>
              {/* {
                let row = {}
                for (let i = 0; i < props.releasedGamesYear.length; i++) {
                <Game name={this.props.releasedGamesYear[i]}
              } */}

              {/* {this.props.releasedGamesYear.map(game => (
             <Game name={game} />
            ))} */}
              <Game name={this.props.releasedGamesYear[0]} />
              <Game name={this.props.releasedGamesYear[1]} />
              <Game name={this.props.releasedGamesYear[2]} />
              <Game name={this.props.releasedGamesYear[3]} />
              <Game name={this.props.releasedGamesYear[4]} />



            </div>
          }


        </ul>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    const { name } = this.props;
    return (
      <li>{name}</li>
    );
  }
}

export default ReleasedGames
