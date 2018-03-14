
// packages
import React, { Component } from 'react';
import './App.css';


//components
import MainContainer from './containers/MainContainer'
import SignUp from './users/SignUp'
import AllFriendsMap from './allFriendsMap'


class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer />
        <SignUp/>
        <AllFriendsMap/>
      </div>
    );
  }
}

export default App;

//
// <MapWithAMarker
//   isMarkerShown
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
// />;
