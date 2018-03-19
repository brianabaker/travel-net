
import React from 'react'

// google maps stuff

import TripMap from './TripMap'
import {connect} from 'react-redux'
import {fetchTrip, addToTrip} from '../actions/trips'
import {findAddress, getLatLng} from '../helpers'
import LocationList from './LocationList'

class Trip extends React.Component {
  state = {
    trip: '',
    newLocation: ''
  }

  componentDidMount () {
    console.log(this.props)
    this.props.fetchTrip(this.props.currentUser)
    this.setState({
      trip: this.props.currentTrip
    })
  }

  handleOnChange = (e) => {
    this.setState({
      newLocation: e.target.value
    })
  }

  handleAddLocation = (e) => {
    e.preventDefault()
    console.log(this.state.newLocation)
    getLatLng(this.state.newLocation).then(res =>
    this.props.addToTrip(this.props.currentTrip.id, res))

  }

  render(){
    return (
      <div className="ui stackable grid container">
        {this.props.tripLocations ?
          <React.Fragment>
          <div className="two column row">
            <div className="column">
              <h4>{this.props.currentTrip.name}</h4>
            </div>
          </div>
          <div className="ten wide column">
            {this.props.tripLocations ? <TripMap locations={this.props.tripLocations} />: "loading"}
        </div>
          <div className="four wide column">
            <form onSubmit={this.handleAddLocation}>
              <input type="text" placeholder="Enter New Location" value={this.state.newLocation} onChange={this.handleOnChange}/>
              <button>Go</button>
            </form>
            <h4>Your Locations So Far</h4>
            <LocationList locations={this.props.tripLocations}/>
          </div>
          </React.Fragment>
          : "Loading"}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          currentTrip: state.trips.currentTrip,
          tripLocations: state.trips.tripLocations}
}

export default connect(mapStateToProps, {fetchTrip, addToTrip})(Trip)
