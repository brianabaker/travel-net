
// packages
import React, { Component } from 'react';
import './App.css';

import FrontPage from './containers/FrontPage'


class App extends Component {
  render() {
    return (
        <FrontPage />
    );
  }
}

export default App

//
// <MapWithAMarker
//   isMarkerShown
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
// />;
