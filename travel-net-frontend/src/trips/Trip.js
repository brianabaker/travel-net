
import React from 'react'

// google maps stuff

// import Popup from "reactjs-popup";

import TripMap from './TripMap'
import {connect} from 'react-redux'
import {fetchTrip, addToTrip, endTrip} from '../actions/trips'
import {getLatLng} from '../helpers'
import LocationList from './LocationList'
import EndTripConfirmation from './EndTripConfirmation'
import AskUserWhereTheyLiveAfterTrip from '../users/AskUserWhereTheyLiveAfterTrip'
import AddPhotos from './AddPhotos'

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

  checkIfCurrentUser = () => {
    if (this.props.currentUser.id == this.props.currentTrip.user_id) {
      return(
        <button>Add Image</button>
      )
    }
  }

  checkActive = () => {
    if (this.props.currentTrip.active && (this.props.currentUser.id == this.props.currentTrip.user_id)) {
      return(
        <React.Fragment>
          <form onSubmit={this.handleAddLocation}>
            <input type="text" placeholder="Enter New Location" value={this.state.newLocation} onChange={this.handleOnChange}/>
            <button>Go</button>
          </form>
          <EndTripConfirmation endTrip={this.endTrip}/>
          <LocationList active={this.props.currentTrip.active} tripId={this.props.currentTrip.id} locations={this.props.tripLocations}/>
        </React.Fragment>
      )
    } else {
      return(
        <React.Fragment>
          <h4>Keep Trekking</h4>
            <LocationList active={this.props.currentTrip.active} tripId={this.props.currentTrip.id} locations={this.props.tripLocations}/>
        </React.Fragment>
      )
    }
  }

  submitPhotos = (result) => {
    let id = this.props.currentTrip.id
    console.log(result)
    result.filesUploaded.map(newPhoto => {
      fetch(`http://localhost:3000/trips/${id}/photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          photoUrl: newPhoto
        })
    })
  })
    .then(res => res.json())
  }


  onSuccess = (result) => {
    this.submitPhotos(result)
    }
    onError = (error) => {
      console.error('error', error);
    }

  render(){
    if (this.props.isLoading === "Loading"){
      return (
        <div>Trips Page Loading</div>
      )
    } else {
    return (
      <div className="ui stackable grid container">
        {this.props.tripLocations ?
        <React.Fragment>
        <div className="two column row">
          <div className="column">
            <h4>{this.props.currentTrip.name}</h4>
          </div>
        </div>
        <div className="twelve wide column" style={{paddingBottom: "0"}}>
          {this.props.tripLocations ? <TripMap locations={this.props.tripLocations}/>: "loading"}
        </div>
        <div className="four wide column">
          {this.checkActive()}
          {this.checkIfCurrentUser()}
        </div>
        </React.Fragment>
        : null}
        <div className="fourteen wide column" style={{paddingTop: "0"}}>
            <AddPhotos onSuccess={this.onSuccess} onError={this.onError}/>
        </div>
        <div className="fourteen wide column" style={{paddingTop: "0"}}>
          An Array of images here
        </div>
      </div>

      )
    }
  }
}

// {this.props.tripLocations ? <TripMap locations={this.props.tripLocations}/>: "loading"}
const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          currentTrip: state.trips.currentTrip,
          isLoading: state.trips.isLoading,
          tripLocations: state.trips.tripLocations}
}

export default connect(mapStateToProps, {fetchTrip, addToTrip, endTrip})(Trip)
