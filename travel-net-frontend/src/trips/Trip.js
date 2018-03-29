
import React from 'react'

// google maps stuff

// import Popup from "reactjs-popup";
// import TripApi from '../services/tripApi'
import TripMap from './TripMap'
import {connect} from 'react-redux'
import {fetchTrip, addToTrip, endTrip, addPhotos} from '../actions/trips'
import {getLatLng} from '../helpers'
import LocationList from './LocationList'
import EndTripConfirmation from './EndTripConfirmation'
import AskUserWhereTheyLiveAfterTrip from '../users/AskUserWhereTheyLiveAfterTrip'
import AddPhotos from './AddPhotos'

import TripImages from './TripImages'
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
    if (this.props.currentUser && this.props.currentTrip) {
      if (this.props.currentUser.id === this.props.currentTrip.user_id) {
        return(
          <AddPhotos onSuccess={this.onSuccess} onError={this.onError}/>
        )
      }
    }
  }

  checkActive = () => {
    if (this.props.currentTrip.active && (this.props.currentUser.id === this.props.currentTrip.user_id)) {
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
    let tripId = this.props.currentTrip.id
    let arrayOfPhotos = result
    this.props.addPhotos(tripId, arrayOfPhotos)
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
        </div>
        </React.Fragment>
        : null}
        <div className="fourteen wide column" style={{paddingTop: "0", paddingBottom: "0"}}>
          {this.checkIfCurrentUser()}
        </div>
        <div className="fourteen wide column" style={{paddingTop: "0", overflow: "auto", overflowY: "hidden"}}>
            <TripImages/>
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

export default connect(mapStateToProps, {fetchTrip, addToTrip, endTrip, addPhotos})(Trip)
