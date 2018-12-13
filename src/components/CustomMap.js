import React, { Component } from 'react';
import '../App.css';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
class CustomMap extends Component {
    shouldComponentUpdate() {
        return false; // Will cause component to never re-render.
    }
    render() {

        const Map = ReactMapboxGl({
            accessToken: "pk.eyJ1IjoiZmxhdnptc2UiLCJhIjoiY2pwa2U0cGl1MDJlNDN4bXJiMHVjMjZwNyJ9.J9a8ZVU_RCEbAioPyvIRhA",
            scrollZoom: false,
            dragRotate: false,
            interactive: false,
            renderWorldCopies : false
        });
        return (
            <div className="mapContainer">
                <Map
                    center={[0, 30]} // starting position [lng, lat]
                    zoom={[0.75]}// starting zoom

                    style="mapbox://styles/mapbox/dark-v9"
                    containerStyle={{
                        height: "100%",
                        width: "100%"
                        // position:"absolute",
                        // top:0,
                        // left:0

                    }}
                >
                    {/* <Layer
                        type="symbol"
                        id="marker"
                        layout={{ "icon-image": "marker-15" }}>
                        <Feature coordinates={[0, 0]} />
                    </Layer> */}
                </Map>
            </div>
        )



    }
}

export default CustomMap