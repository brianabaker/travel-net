import React from "react";
import GoogleMapsWrapper from "../maps/GoogleMapsWrapper.js";
import { Marker } from "react-google-maps";
// import Geocode from "react-geocode";

// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
var blueIcon = require('../images/blue-icon.png');

class FriendsMap extends React.Component {
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

  numberOfPeopleAtLocation = (lat, lng) => {
    let friendsArray = this.props.friends.filter(friend => {
      return parseFloat(friend.lat) === lat && parseFloat(friend.lng) === lng
    })
    return friendsArray.length.toString()
  }

  render() {
    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `85vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={2}
        onClick={() => this.handleToggleClose()}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
      >
      {this.props.friends.filter(friend => friend.on_trip === false).map((friend, i) => {
        let lat = parseFloat(friend.lat.replace('"','').replace('"',''));
        let lng = parseFloat(friend.lng.replace('"','').replace('"',''));
          return (<Marker
          key={i}
          label={this.numberOfPeopleAtLocation(lat, lng)}
          position={{ lat: lat, lng: lng }}
          onClick={() => this.handleToggleOpen(i, lat, lng)}
        >
        </Marker>)
      })}
      {this.props.friends.filter(friend => friend.on_trip === true).map((friend, i) => {
        let lat = parseFloat(friend.lat.replace('"','').replace('"',''));
        let lng = parseFloat(friend.lng.replace('"','').replace('"',''));
          return (<Marker
          key={i}
          icon={blueIcon}
          label={' '}
          position={{ lat: lat, lng: lng }}
          onClick={() => this.handleToggleOpen(i, lat, lng)}
        >
        </Marker>)
      })}
      </GoogleMapsWrapper>
    );
  }
}

// {this.props.friends.map((friend, i) => {
//   let lat = parseFloat(friend.lat.replace('"','').replace('"',''));
//   let lng = parseFloat(friend.lng.replace('"','').replace('"',''));
//     return (<Marker
//     key={i}
//     label={this.numberOfPeopleAtLocation(lat, lng)}
//     position={{ lat: lat, lng: lng }}
//     onClick={() => this.handleToggleOpen(i, lat, lng)}
//   >
//   </Marker>)
// })}

//
// {this.state.openInfoWindowMarkerId === i && <InfoWindow
//   onCloseClick={this.handleToggleClose}
//   options={{ closeBoxURL: ``, enableEventPropagation: true }}
// >
//   <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
//     <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>'Hey'
//     </div>
//   </div>
// </InfoWindow>}


export default FriendsMap
