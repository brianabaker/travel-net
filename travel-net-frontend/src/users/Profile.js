
import React from 'react'
import {connect} from 'react-redux'
import {requestFriendship, fetchProfile} from '../actions/users'
import {fetchTrip} from '../actions/trips'
// import {fetchFriends} from '../actions/users'
import TripMap from '../trips/TripMap'
// import SameProfile from './SameProfile'
import ChatroomContainer from '../friends/ChatroomContainer'

class Profile extends React.Component {
  state = {
    selectedUser: '',
    sameUser: false
  }

  componentDidMount(){
    let id = parseInt(this.props.match.params.userId, 10)
    if (id === this.props.currentUser.id) {
      this.setState({
        sameUser: true
      })
      this.fetchMyProfile(id)
      console.log('in the did mount')
    } else {
      this.setState({
        sameUser: false
      })
      this.fetchProfile(id)
    }
  }

  fetchProfile = (id) => {
    console.log('this is fetching the friends profile', id)
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
        }, () => console.log('selected user', profileJSON))
    })
    .then(() => this.checkTraveling())
    .then(() => this.checkFriendship())
  }

  fetchMyProfile = (id) => {
    fetch(`http://localhost:3000/users/${id}`)
    .then(res => res.json())
    .then(profileJSON => {
      this.setState({
        selectedUser: profileJSON
      })
    })
  }

  checkTraveling = () => {
    if (this.state.selectedUser.on_trip) {
      this.props.fetchTrip(this.state.selectedUser.current_trip_id)
    }
  }

  // make it match as well

  checkFriendship = () => {
    // console.log('check friendship', Array.isArray(this.props.friends), this.state.selectedUser)
    // let result = ''
    if (Array.isArray(this.props.friends) && this.state.selectedUser) {
      let result = this.props.friends.find(friend => {
        return friend.id === this.state.selectedUser.id
      })
      return !!result
  } else {
    return false
  }
}

  requestFriendship = () => {
    let friendId = parseInt(this.props.match.params.userId, 10)
    let userId = parseInt(this.props.currentUser.id, 10)
    this.props.requestFriendship(userId, friendId)
  }

  render() {
    return(
      <div className="ui stackable grid container" id="add-padding">
        <React.Fragment>
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
                  <h4>{this.state.selectedUser.on_trip ?
                    <React.Fragment>
                      Traveling
                      {this.state.sameUser ?
                      <button className="mini ui blue basic button" onClick={() => this.props.history.push('/trips')}>Edit Trip</button>
                      :null}
                    </React.Fragment>
                    : "Not Traveling"}</h4>
              </div>
              <div className="column">
                {!this.state.sameUser ?
                  <React.Fragment>
                    {this.checkFriendship == true ? "Button to remove friend here" :
                      <button onClick={() => this.requestFriendship()}>Add Friend</button>
                    }
                </React.Fragment>
               : <button className="ui green button" onClick={() => this.props.history.push('/edit')}>Edit Profile</button>}
              </div>
            </div>
            <div className="seven wide column">
              {this.state.selectedUser.bio ? <p>{this.state.selectedUser.bio}</p> : "Add Bio Now!"}
            </div>
            <div className="eight wide column">
              {this.checkFriendship ?
                this.state.selectedUser.on_trip ?
                this.props.tripLocations ? <TripMap locations={this.props.tripLocations}/>
                : null
               : null
              : null }
            </div>
            </React.Fragment>
          }
          </React.Fragment>
        </div>
      )
  }
}
// {!this.state.sameUser ?
//     this.state.selectedUser ?
//   <ChatroomContainer friend_id={this.state.selectedUser.id}/>
//   : null
// : null }

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          alert: state.users.alert,
          isLoading: state.users.isLoading,
          tripLocations: state.trips.tripLocations,
          friends: state.users.friends}
}

export default connect(mapStateToProps, {fetchProfile, requestFriendship, fetchTrip})(Profile)
