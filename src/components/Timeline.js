import React, { Component } from 'react';
import '../App.css';

class Timeline extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
      }

    handleChange = (e) => {
        this.props.onSelectYear(e.target.value);
    }
    render() {
        return (
            <div className="timelineContainer">
                <h3 className="selectedYearInfo">{this.props.selectedYear}</h3>
                <div className="slidecontainer">
                    <input type="range" min="2003" max="2015" step="1" 
                    value={this.props.selectedYear} className="slider" id="myRange" 
                    onChange={e => this.handleChange(e)} />

                </div>
            </div>
        )
    }
}

export default Timeline
