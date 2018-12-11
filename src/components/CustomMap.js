import React, { Component } from 'react';
import '../App.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class CustomMap extends Component {
    render(){
        return(
            <div className="mapContainer">
                <Map google={this.props.google} zoom={14}>

                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                    {/* <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow> */}
                </Map>
            </div>
        )
       
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCeAPC63sfhFpy1ZcknjNK64Q-yocc-JXE")
  })(CustomMap)