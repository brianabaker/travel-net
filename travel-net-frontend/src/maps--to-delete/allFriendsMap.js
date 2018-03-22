// this one working well with info box
// info box is yellow

import React from "react"

// map packages
// import { compose, withProps, withStateHandlers } from "recompose"
// import {  withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox"

// react-redux
import { connect } from 'react-redux'
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


class MapTroubles extends React.Component {

  state = {
    openInfoWindowMarkerId: ''
}

  handleToggleOpen = () => {
    this.setState({
      openInfoWindowMarkerId: true
    });
  }

  handleToggleClose = () => {
    this.setState({
      openInfoWindowMarkerId: false
    });
  }


render() {
  return (
    <GoogleMap
      defaultZoom={5}
      funny = {'hey'}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <Marker
          key={1}
          position={{lat: -34.397, lng: 150.644 }}
          label={'hey'}
          onClick={() => this.handleToggleOpen()}
      >
      {this.state.isOpen &&
       <InfoWindow onCloseClick={this.props.handleCloseCall}>
           <span>Something</span>
       </InfoWindow>
      }
    </Marker>
    </GoogleMap>
  )}
}

const mapStateToProps = (state) => {
  return {friends: state.users.friends,
          currentUser: state.users.currentUser}
}

export default connect(mapStateToProps)(MapTroubles)

// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0&v=3.exp&libraries=geometry,drawing,places"
//   async defer></script>
  // <MapWithAMarker
  //   googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0&v=3.exp&libraries=geometry,drawing,places"
  //   loadingElement={<div style={{ height: `100%` }} />}
  //   containerElement={<div style={{ height: `400px` }} />}
  //   mapElement={<div style={{ height: `100%` }} />}
  // />
