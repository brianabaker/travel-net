
import React from 'react'
import {connect} from 'react-redux'

import {createTrip} from '../actions/trips'
import {cancelCreateTrip} from '../actions/trips'
import {getLatLng} from '../helpers'


class NewTripForm extends React.Component {
  state = {
    tripName: '',
    firstLocation: ''
  }

  handleTripName = (e) => {
    this.setState({
      tripName: e.target.value
    })
  }

  handleLocation = (e) => {
    this.setState({
      firstLocation: [e.target.value]
    })
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(this.state.tripName)
  //   console.log(this.state.firstLocation)
  //   console.log(this.props)
  //   Geocode.setApiKey("AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0");
  //   Geocode.enableDebug();
  //   Geocode.fromAddress(this.state.firstLocation).then(
  //     response => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       this.props.createTrip(this.props.currentUser, this.state.tripName, lat, lng)
  //     },
  //     error =>
  //      {
  //       console.error(error);
  //     }
  //   )
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    getLatLng(this.state.firstLocation).then(res =>
    this.props.createTrip(this.props.currentUser, this.state.tripName, res))
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Give Your Trip a Name
            <input type="text" name="tripName" value={this.state.tripName} onChange={this.handleTripName}/>
          </label>
        </div>
        <div>
          <label>
            Where are you going to first?
            <input type="text" name="firstLocation"
            value={this.state.firstLocation} onChange={this.handleLocation}/>
          </label>
        </div>
          <input type="submit"/>
          <button onClick={this.props.cancelCreateTrip}>Cancel</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps, {createTrip, cancelCreateTrip})(NewTripForm)
