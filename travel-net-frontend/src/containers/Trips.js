
import React from 'react'

import {connect} from 'react-redux'
import {renderForm, fetchTrip} from '../actions/trips'
import Trip from '../trips/Trip'
import NewTripForm from '../trips/newTripForm'


class TripsContainer extends React.Component {
  state = {
    locations: ''
  }
  // componentDidMount () {
  //   console.log(this.props)
  //   this.props.fetchTrip(this.props.currentUser)
  // }

  render(){
    return(
      <div>
        {this.props.currentUser.on_trip ? <Trip id={this.props.currentUser.current_trip_id}/> : this.props.formState ? <NewTripForm/> :
            <React.Fragment>
              <button onClick={this.props.renderForm} className="ui green button">Make a trip!</button>
              No past trips!
            </React.Fragment>
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {formState: state.trips.renderForm,
          currentUser: state.users.currentUser}
}

export default connect(mapStateToProps, {renderForm, fetchTrip})(TripsContainer)
