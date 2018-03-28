
import React from 'react'

// google maps stuff

import Popup from "reactjs-popup";

import TripMap from './TripMap'
import {connect} from 'react-redux'
import {fetchTrip, addToTrip, endTrip} from '../actions/trips'
import {getLatLng} from '../helpers'
import LocationList from './LocationList'
import EndTripConfirmation from './EndTripConfirmation'
import AskUserWhereTheyLiveAfterTrip from '../users/AskUserWhereTheyLiveAfterTrip'

class Trip extends React.Component {
  state = {
    newLocation: '',
    openPopup: false
  }

  componentDidMount () {
    if (this.props.id) {
      this.props.fetchTrip(this.props.id)
    } else {
      let tripId = parseInt(this.props.match.params.tripId, 10)
      this.props.fetchTrip(tripId)
    }
  }

  handleOnChange = (e) => {
    this.setState({
      newLocation: e.target.value
    })
  }

  handleAddLocation = (e) => {
    e.preventDefault()
    getLatLng(this.state.newLocation).then(res =>
    this.props.addToTrip(this.props.currentTrip.id, res))
    this.setState({
      newLocation: ''
    })
  }

  endTrip = () => {
    console.log(this.props.currentTrip)
    console.log('in the end trip')
    this.props.endTrip(this.props.currentUser, this.props.currentTrip)
    this.setState({
      openPopup: true
    })
    if (this.state.openPopup === true){
      return(
        <AskUserWhereTheyLiveAfterTrip open={this.state.openPopup}/>
      )
    }
  }

  render(){
    if (this.props.isLoading === "Loading"){
      return (
        <div>Trips Page Loading</div>
      )
    }
    return (
      <div className="ui stackable grid container">
          <React.Fragment>
          <div className="two column row">
            <div className="column">
              <h4>{this.props.currentTrip.name}</h4>
            </div>
          </div>
          <div className="twelve wide column">
            {this.props.tripLocations ? <TripMap locations={this.props.tripLocations}/>: "loading"}
        </div>
          <div className="four wide column">
            <form onSubmit={this.handleAddLocation}>
              <input type="text" placeholder="Enter New Location" value={this.state.newLocation} onChange={this.handleOnChange}/>
              <button>Go</button>
            </form>
            <EndTripConfirmation endTrip={this.endTrip}/>
            <h4>Your Locations So Far</h4>
            <LocationList tripId={this.props.currentTrip.id} locations={this.props.tripLocations}/>
          </div>
          </React.Fragment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          currentTrip: state.trips.currentTrip,
          isLoading: state.trips.isLoading,
          tripLocations: state.trips.tripLocations}
}

export default connect(mapStateToProps, {fetchTrip, addToTrip, endTrip})(Trip)
