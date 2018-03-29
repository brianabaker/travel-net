
import React from 'react'

import {connect} from 'react-redux'
import {renderForm, fetchTrip} from '../actions/trips'
import Trip from '../trips/Trip'
import NewTripForm from '../trips/newTripForm'
import PastTrips from '../trips/PastTrips'
// import jwt_decode from 'jwt-decode';

class TripsContainer extends React.Component {
  state = {
    locations: ''
  }

  checkPastTrips = () => {
    if (this.props.pastTrips) {
        this.props.pastTrips.map(trip => {
          if (trip.name === '' ) {
            console.log(trip.name === '')
            return(
              <PastTrips key={trip.id} id={trip.id} text={"Untitled Trip"}/>
            )
          } else {
            return(
              <PastTrips key={trip.id} id={trip.id} text={trip.name}/>
            )
          }
        })
    }
  }

  render(){
    return(
      <div>
        {this.props.currentUser.on_trip ? <Trip id={this.props.currentUser.current_trip_id}/> : this.props.formState ? <NewTripForm/> :
            <React.Fragment>
              <button onClick={this.props.renderForm} className="ui blue button">Start A New Trip</button>
              <PastTrips/>
            </React.Fragment>
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {formState: state.trips.renderForm,
          currentUser: state.users.currentUser,
          pastTrips: state.users.pastTrips}
}

export default connect(mapStateToProps, {renderForm, fetchTrip})(TripsContainer)
