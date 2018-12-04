import React, { Component } from 'react';
import '../App.css';

class Timeline extends Component {

    render(){
        return(
            <div className="timelineContainer">
              <h3>selected year: </h3> <p>{this.props.selectedYear}</p>
            </div>

        )
    }
}

export default Timeline
