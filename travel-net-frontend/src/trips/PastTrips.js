
import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import placeholder from '../images/super-small-world.png'

const moment = require('moment');

const PastTrips = (props) => {
  let checkPastTrips = () => {
    if (props.pastTrips) {
        let num = 0
        return props.pastTrips.map(trip => {
          if (trip.name === '') {
            num = num + 1
            return(
              <div className="card set-width" key={trip.id}>
                <Link to={`trips/${trip.id}`}>
                <div className="image">
                  {trip.most_recent_photo_url ?
                      <img height="100px" width="150px" alt="thumbnail" src={trip.most_recent_photo_url}/>
                  :
                      <img height="100px" alt="thumbnail" width="150px" src={placeholder}/>
                  }
                </div>
                  <div className="header">Best Trip Ever {num}</div>
                    <div className="meta">
                      <span className="date">{moment(trip.created_at).format("MMM Do YY")}</span>
                    </div>
                </Link>
              </div>
            )
          } else {
            return(
            <div className="card set-width" key={trip.id}>
              <Link to={`trips/${trip.id}`}>
                <div className="image">
                  {trip.most_recent_photo_url ?
                      <img height="100px" width="150px" alt="thumbnail" src={trip.most_recent_photo_url}/>
                  :
                      <img height="100px" width="150px" alt="thumbnail" src={placeholder}/>
                  }
                </div>
                <div className="header">{trip.name}</div>
                  <div className="meta">
                    <span className="date">{moment(trip.created_at).format("MMM Do YY")}</span>
                  </div>
              </Link>
            </div>
            )
          }
        })
    }
  }

  return(
    <div className="ui eight wide column">
      <br/>
      <h4>All Your Past Trips</h4>
      <div className="ui link cards">
        {checkPastTrips()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {pastTrips: state.users.pastTrips}
}

export default connect(mapStateToProps)(PastTrips)
