
import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import {image} from '../images/blank-picture-frame.png'

const PastTrips = (props) => {
  let checkPastTrips = () => {
    if (props.pastTrips) {
        let num = 0
        return props.pastTrips.map(trip => {
          if (trip.name === '') {
            num = num + 1
            console.log(trip.most_recent_photo_url == null)
            return(
              <div className="card" key={trip.id}>
                <Link to={`trips/${trip.id}`}>
                <div class="image">
                  {trip.most_recent_photo_url ?
                      <img className="ui small image" height="100px" width="150px" src={trip.most_recent_photo_url}/>
                  :
                      <img className="ui small image" height="100px" width="150px" src="http://via.placeholder.com/350x150"/>
                  }
                </div>
                  <div classNam="header">Best Trip Ever {num}</div>
                </Link>
              </div>
            )
          } else {
            return(
            <div className="card" key={trip.id}>
              <Link to={`trips/${trip.id}`}>
                <div class="image">
                  {trip.most_recent_photo_url ?
                      <img className="ui small image" height="100px" width="150px" src={trip.most_recent_photo_url}/>
                  :
                      <img className="ui small image" height="100px" width="150px" src="http://via.placeholder.com/350x150"/>
                  }
                </div>
                <div classNam="header">{trip.name}</div>
              </Link>
            </div>
            )
          }
        })
    }
  }

  return(
    <div className="ui eight wide column set-width">
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
