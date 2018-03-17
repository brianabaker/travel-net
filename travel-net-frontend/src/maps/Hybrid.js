import React from "react";
import GoogleMapsWrapper from "./GoogleMapsWrapper.js";
import { Marker, InfoWindow } from "react-google-maps";
import Geocode from "react-geocode";

// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

class WorkingMap extends React.Component {
  state = {
    markers: [],
    traveling: [],
    isOpen: false,
    openInfoWindowMarkerId: ''
  };

  componentDidMount(){
    this.setState({
      markers: this.props.friends
    })
  }

  handleToggleOpen = (markerId, lat, lng) => {
    this.setState({
        openInfoWindowMarkerId: markerId,
    })
    this.props.cb(lat, lng)
  }

  handleToggleClose = (id) => {
    this.setState({
      isOpen: false,
      openInfoWindowMarkerId: ''
    });
    this.props.undo()
  }

  // this is not working
  // geoLocateUsers = () => {
  //   Geocode.setApiKey("AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0");
  //   Geocode.enableDebug();
  //   this.props.friends.forEach(user => {
  //     Geocode.fromLatLng(`${user.lat}`, `${user.lng}`).then(
  //       response => {
  //        response.results.find(place =>
  //            place.types.includes("locality")
  //         ).formatted_address
  //       },
  //       error => {
  //         console.error(error);
  //       }
  //     )
  //   })
  // }


  render() {
    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={3}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
      >
      {this.props.friends.map((friend, i) => {
        let lat = parseFloat(friend.lat.replace('"','').replace('"',''));
        let lng = parseFloat(friend.lng.replace('"','').replace('"',''));
          return (<Marker
          key={i}
          label={i.toString()}
          position={{ lat: lat, lng: lng }}
          onClick={() => this.handleToggleOpen(i, lat, lng)}
        >
          {this.state.openInfoWindowMarkerId === i && <InfoWindow
            onCloseClick={this.handleToggleClose}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>'Hey'
              </div>
            </div>
          </InfoWindow>}
        </Marker>)
      })}
      </GoogleMapsWrapper>
    );
  }
}

export default WorkingMap
