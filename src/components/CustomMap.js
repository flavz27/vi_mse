import React, { Component } from 'react';
import '../App.css';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
class CustomMap extends Component {

    render() {

        const Map = ReactMapboxGl({
            accessToken: "pk.eyJ1IjoiZmxhdnptc2UiLCJhIjoiY2pwa2U0cGl1MDJlNDN4bXJiMHVjMjZwNyJ9.J9a8ZVU_RCEbAioPyvIRhA"
        });
        return (
            <div className="mapContainer">
                <Map
                    style="mapbox://styles/mapbox/dark-v9"
                // containerStyle={{
                //     height: "500px",
                //     width: "900px"
                // }}
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