
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
    this.functionWithCurrentUser()
  }

  functionWithCurrentUser = () => {
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
    .then(() => this.checkFriendship())
  }

  checkTraveling = () => {
    if (this.state.selectedUser.on_trip) {
      this.props.fetchTrip(this.state.selectedUser.current_trip_id)
    }
  }

  // make it match as well

  checkFriendship = () => {
    console.log('in the check friednship', this.props.friends)
    let result = ''
    if (this.props.friends.isArray && this.state.selectedUser) {
      return result = this.props.friends.find(friend => {
        return friend === this.props.selectedUser
        // result = true
      })
    } else {
        result = ''
    }
    return result
  }

  requestFriendship = () => {
    let friendId = parseInt(this.props.match.params.userId, 10)
    let userId = parseInt(this.props.currentUser.user.id, 10)
    this.props.requestFriendship(userId, friendId)
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
                {this.checkFriendship === true ? "Button to remove friend here" :
                  <button onClick={() => this.requestFriendship()}>Add Friend</button>
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
