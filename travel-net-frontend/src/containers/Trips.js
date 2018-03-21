
import React from 'react'

import {connect} from 'react-redux'
import {renderForm, fetchTrip} from '../actions/trips'
import Trip from '../trips/Trip'
import NewTripForm from '../trips/newTripForm'

// import jwt_decode from 'jwt-decode';

class TripsContainer extends React.Component {
  state = {
    locations: ''
  }

  // componentDidMount () {
  //   const token = localStorage.getItem("token");
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace('-', '+').replace('_', '/');
  //   console.log(JSON.parse(window.atob(base64)))
  //
  //
  //   this.props.fetchTrip(this.props.currentUser)
  // }
  //
  // // <Trip id={this.props.currentUser.current_trip_id}/>

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
