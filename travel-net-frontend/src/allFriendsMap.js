// this one working well with info box
// info box is yellow

import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import {  withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"
import InfoBox from "react-google-maps/lib/components/addons/InfoBox"

var blueIcon = require('./blue-icon.png');

const AllFriendsMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 40.712775, lng: -74.005973 },
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)((props) =>

  <GoogleMap
    defaultZoom={5}
    defaultCenter={props.center}
  >
  <Polyline
  path={[{ lat: 40.712775, lng: -74.005973 },
    {lat: 39.9521740263203, lng: -75.1661518986459},
    ]}
  options={{
  strokeColor: '#ff0000',
  strokeOpacity: 1,
  strokeWeight: 3,
  icons: [{
    icon: "safe",
    offset: '0',
    repeat: '10px'
  }],
}}
/>
    <Marker
      icon={blueIcon}
      cityName={"hi"}
      position={{lat: 34.052234, lng: -118.243685}}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoBox
        onCloseClick={props.onToggleOpen}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>{this.cityName}
          </div>
        </div>
      </InfoBox>}
    </Marker>
  </GoogleMap>
)


export default AllFriendsMap
