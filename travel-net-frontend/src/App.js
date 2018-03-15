
// packages
import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter } from 'react-router-dom'
import {connect} from 'react-redux';

//components
import NavBar from './NavBar'
import SignUp from './users/SignUp'
import AllFriendsMap from './allFriendsMap'
import FrontPage from './containers/FrontPage'
// import FindAddress from './findAddress'

// <SignUp/>
// <AllFriendsMap/>

class App extends Component {
  render() {
    return (
      <div>
        <FrontPage />
      </div>
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
