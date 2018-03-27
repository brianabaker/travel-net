import React from "react";
import GoogleMapsWrapper from "../maps/GoogleMapsWrapper.js";

class EmptyMap extends React.Component {
  render() {
    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `85vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={3}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
      >
      </GoogleMapsWrapper>
    );
  }
}


export default EmptyMap
