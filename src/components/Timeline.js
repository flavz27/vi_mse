import React, { Component } from 'react';
import '../App.css';

class Timeline extends Component {

    render() {
        return (
            <div className="timelineContainer">
                <h3>selected year: </h3> <p>{this.props.selectedYear}</p>
                <div className="slidecontainer">
                    <input type="range" min="1980" max="2016" value={this.props.selectedYear} className="slider" id="myRange" />
                    <p>Value: <span id="demo"></span></p>
                </div>
            </div>

                )
            }
        }
        
        export default Timeline
