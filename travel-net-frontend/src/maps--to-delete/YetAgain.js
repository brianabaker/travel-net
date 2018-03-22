import React from "react";
import GoogleMapsWrapper from "./GoogleMapsWrapper.js";
import { Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

class YetAgain extends React.Component {
  state = {
    markers: []
  };

  componentDidMount(){
    this.setState({
      markers: this.props.friends
    }, () => console.log(this.state.markers))
  }

  render() {
    console.log(this.props)
    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={3}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
      >
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}>

              </Marker>
          ))}
        </MarkerClusterer>
      </GoogleMapsWrapper>
    );
  }
}

export default YetAgain
