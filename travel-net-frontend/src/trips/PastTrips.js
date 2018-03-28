
import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'
const PastTrips = (props) => {
  let checkPastTrips = () => {
    if (props.pastTrips) {
        let num = 0
        return props.pastTrips.map(trip => {
          if (trip.name === '' ) {
            num = num + 1
            return(
              <li key={trip.id}><Link to={`trips/${trip.id}`}>Best Trip Ever {num}</Link></li>
            )
          } else {
            return(
              <li key={trip.id}><Link to={`trips/${trip.id}`}>{trip.name}</Link></li>
            )
          }
        })
    }
  }

  return(
    <div>
      <ul>{checkPastTrips()}</ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {pastTrips: state.users.pastTrips}
}

export default connect(mapStateToProps)(PastTrips)
