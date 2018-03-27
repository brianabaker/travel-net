
import React from 'react'
import {connect} from 'react-redux'
import {requestFriendship, fetchProfile} from '../actions/users'
import {fetchTrip} from '../actions/trips'
// import {fetchFriends} from '../actions/users'
import TripMap from '../trips/TripMap'
// import SameProfile from './SameProfile'
// import ChatroomContainer from '../friends/ChatroomContainer'

import Image from '../images/profile-pic-empty.gif'

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
    } else {
      this.setState({
        sameUser: false
      })
      this.fetchProfile(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.userId !== nextProps.match.params.userId) {
      this.fetchMyProfile(nextProps.match.params.userId)
    }
  }


  fetchProfile = (id) => {
    // console.log('this is fetching the friends profile', id)
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

  displayTraveling = () => {
    if (this.state.selectedUser.on_trip){
      return (<h4>
        <React.Fragment>
          Traveling
          {this.state.sameUser ?
          <button className="mini ui blue basic button" onClick={() => this.props.history.push('/trips')}>Edit Trip</button>
          :null}
        </React.Fragment>
      </h4>)
    } else {
      return (
        <h4>Not Traveling</h4>
      )
    }
  }

  renderImage = () => {
    if (this.state.selectedUser.profile_pic_url) {
      return (
        <img src={this.state.selectedUser.profile_pic_url} alt="profile pic" style={{height: "300px", width: "300px"}}/>
      )
    } else {
      return (
        <img src={Image} alt="profile pic" style={{height: "300px", width: "300px"}}/>
      )
    }
  }

  render() {
    if (this.props.isLoading === "Loading"){
      return (
        <div>Loading</div>
      )
    }
    return(
      <div className="ui stackable grid container" id="add-padding">
        <React.Fragment>
        {this.props.alert ? (
          <div className="ui positive message">
            {this.props.alert.message}
          </div>)
          : null}
            <React.Fragment>
              <div className="two column row">
                <div className="column">
                  {this.renderImage()}
                  <h4>{this.state.selectedUser.username}</h4>
                  {this.displayTraveling()}
              </div>
              <div className="column">
                {!this.state.sameUser ?
                  <React.Fragment>
                    {this.checkFriendship() === true ? "Button to remove friend here" :
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
              {this.checkFriendship() ?
                this.state.selectedUser.on_trip ?
                this.props.tripLocations ? <TripMap locations={this.props.tripLocations}/>
                : null
               : null
              : null }
            </div>
            </React.Fragment>

          </React.Fragment>
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
