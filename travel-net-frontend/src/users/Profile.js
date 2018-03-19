
import React from 'react'
import {connect} from 'react-redux'
import {requestFriendship, fetchProfile} from '../actions/users'
import {fetchTrip} from '../actions/trips'
// import {fetchFriends} from '../actions/users'
import TripMap from '../trips/TripMap'

class Profile extends React.Component {
  state = {
    selectedUser: ''
  }

  componentDidMount(){
    let id = parseInt(this.props.match.params.userId, 10)
    this.props.fetchProfile(this.props.currentUser, id)
    this.checkTraveling()
  }

  checkTraveling = () => {
    if (this.props.selectedUser.on_trip) {
      this.props.fetchTrip(this.props.selectedUser.current_trip_id)
    }
  }
  checkFriendship = () => {
    let result = ''
    if (this.props.friends && this.props.selectedUser) {
      return this.props.friends.find(friend => {
        return friend === this.props.selectedUser
          result = true
      })
    } else if (this.props.friends && this.props.selectedUser) {
      return this.props.friends.find(friend => {
        return friend !== this.props.selectedUser
           result = false
    })
  }
  return result
}

  render() {
    return(
      <div className="ui stackable grid container">
        {this.props.alert ? (
          <div className="ui positive message">
            {this.props.alert.message}
          </div>)
          : null}
          {this.props.isLoading ? "Loading" :
            <React.Fragment>
              <div className="two column row">
                <div className="column">
                  <h4>{this.props.selectedUser.username}</h4>
                  <h4>{this.props.selectedUser.on_trip ? "Traveling" : "Not Traveling"}</h4>
              </div>
              <div className="column">
                {this.checkFriendship ? "Button To Remove friend Here" :
                  <button onClick={() => this.props.requestFriendship(this.props.currentUser)}>Add Friend</button>
              }
              </div>
            </div>
            <div className="seven wide column">
              <p>bio here</p>
            </div>
            <div className="eight wide column">
              {this.checkFriendship ?
              this.props.tripLocations ? <TripMap locations={this.props.tripLocations}/> : null
              : null }
            </div>
            </React.Fragment>
          }
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          alert: state.users.alert,
          isLoading: state.users.isLoading,
          selectedUser: state.users.selectedUser,
          tripLocations: state.trips.tripLocations,
          friends: state.users.friends}
}

export default connect(mapStateToProps, {fetchProfile, requestFriendship, fetchTrip})(Profile)
