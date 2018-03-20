
import React from 'react'
import {connect} from 'react-redux'
import {requestFriendship, fetchProfile} from '../actions/users'
import {fetchTrip} from '../actions/trips'
// import {fetchFriends} from '../actions/users'
import TripMap from '../trips/TripMap'

import ChatroomContainer from '../friends/ChatroomContainer'

class Profile extends React.Component {
  state = {
    selectedUser: ''
  }

  componentDidMount(){
    let id = parseInt(this.props.match.params.userId, 10)
    fetch(`http://localhost:3000/users/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: this.props.currentUser
      })
    })
    .then(res => res.json())
    .then(profileJSON => {
      this.setState({
        selectedUser: profileJSON
      })
    })
    .then(() => this.checkTraveling())
  }


  checkTraveling = () => {
    if (this.state.selectedUser.on_trip) {
      this.props.fetchTrip(this.state.selectedUser.current_trip_id)
    }
  }

  // make it match as well

  checkFriendship = () => {
    let result = ''
    if (this.props.friends && this.state.selectedUser) {
      return this.props.friends.find(friend => {
        return friend === this.props.selectedUser
          result = true
      })
    } else if (this.props.friends && this.state.selectedUser) {
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
                  <h4>{this.state.selectedUser.username}</h4>
                  <h4>{this.state.selectedUser.on_trip ? "Traveling" : "Not Traveling"}</h4>
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
                this.state.selectedUser.on_trip ?
                this.props.tripLocations ? <TripMap locations={this.props.tripLocations}/>
                : null
               : null
              : null }
            </div>
            {this.state.selectedUser ? <ChatroomContainer friend_id={this.state.selectedUser.id}/> : "Loading"}
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
          tripLocations: state.trips.tripLocations,
          friends: state.users.friends}
}

export default connect(mapStateToProps, {fetchProfile, requestFriendship, fetchTrip})(Profile)
