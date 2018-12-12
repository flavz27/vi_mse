import React, { Component } from 'react';
import '../App.css';

class Timeline extends Component {

    constructor(){
        super();
        this.state={
          selectedYear: "2014"
        }
      }

    handleChange = () => {
        this.props.onSelectYear(2011);
    }
    render() {
        return (
            <div className="timelineContainer">
                <h3>selected year: </h3> <p>{this.props.selectedYear}</p>
                <div className="slidecontainer">
                    <input type="range" min="1980" max="2016" step="1" value={this.props.selectedYear} className="slider" id="myRange" onChange={this.handleChange} />

                </div>
            </div>

        )
    }
}

export default Timeline
