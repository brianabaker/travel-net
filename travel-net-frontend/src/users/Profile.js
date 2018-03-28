
import React from 'react'
import {connect} from 'react-redux'
import {requestFriendship, fetchProfile} from '../actions/users'
import {fetchTrip} from '../actions/trips'
// import {fetchFriends} from '../actions/users'
import TripMap from '../trips/TripMap'
import {findAddress} from '../helpers'
import RenderButton from './RenderButton'
import Image from '../images/profile-pic-empty.gif'

class Profile extends React.Component {
  state = {
    selectedUser: '',
    sameUser: false,
    location: '',
    currentUserFriendsArray: '',
    requestedFriendshipBoolean: '',
    selectedFriendsWithCurrentUser: ''
  }

  componentDidMount(){
    let id = parseInt(this.props.match.params.userId, 10)
    if (id === this.props.currentUser.id) {
      this.setState({
        sameUser: true
      }, () => console.log(this.state.sameUser))
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedUser) {
      this.showLocation()
    }
    if (this.state.currentUserFriendsArray) {
      let requestedFriendshipBoolean = this.state.currentUserFriendsArray.map(friend => friend.id).includes(this.state.selectedUser.id)
      this.setState({
        requestedFriendshipBoolean: requestedFriendshipBoolean
      }, () => console.log(this.state.requestedFriendshipBoolean))
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.selectedUser) {
      if (this.state.location === nextState.location) {
        return false
      } else if (this.state.location !== nextState.location){
        return true
      }
    } else if (!this.state.selectedUser){
      return true
    } else if (this.props.match.params.userId !== nextProps.match.params.userId) {
      return true
    }
    // if (this.props.alert !== nextProps.alert){
    //   console.log('if true')
    //   return true
    // }
  }

  showLocation = () => {
    if (this.state.location === "" ) {
      let currentLocation = findAddress(parseFloat(this.state.selectedUser.lat), parseFloat(this.state.selectedUser.lng))
      .then(data => {
        this.setState({
          location:data
        })
      })
    }
  }

  renderLocation = () => {
    if (this.state.location) {
      return(
        <p>Currently in: {this.state.location}</p>
      )
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
          selectedUser: profileJSON.user,
          currentUserFriendsArray: profileJSON.current_user_pending_friends_array,
          selectedFriendsWithCurrentUser: profileJSON.are_friends
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
    if (Array.isArray(this.props.friends) && (this.state.selectedUser.id !== this.props.currentUser.id)) {
      let result = this.props.friends.find(friend => {
        return friend.id === this.state.selectedUser.id
      })
      return !!result
  } else if (this.state.sameUser === true ){
    return (
      "same user"
    )
  }  else {
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
      return (<h4 className="ui header">
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

  checkButton = () => {
    if (this.checkFriendship() === true) {
      return(
        <RenderButton text={"remove friend button"}/>
      )
    } else if (this.state.sameUser === false && this.state.requestedFriendshipBoolean === false){
      return(
        <RenderButton text={"add friend"} function={this.requestFriendship}/>
      )
    } else if (this.state.sameUser === true) {
      return(
        <RenderButton text={"edit profile"} function={() => this.props.history.push('/edit')}/>
      )
    } else if (this.state.requestedFriendshipBoolean === true) {
      console.log('if true')
      return (
        <RenderButton text={"sent friend request"}/>
      )
    }
  }

  renderAlert = () => {
    console.log('if render')
    if (this.props.alert) {
      <div className="ui positive message">
        {this.props.alert.message}
      </div>
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
        {this.renderAlert()}
            <React.Fragment>
              <div className="two column row">
              <div className="column"></div>
              <div className="column">
                {this.checkButton()}
              </div>
            </div>
            <div className="seven wide column">
              {this.renderImage()}
              <h4 className="ui header">{this.state.selectedUser.username}</h4>
              {this.displayTraveling()}
              {this.renderLocation()}
              {this.state.selectedUser.bio ? <p>{this.state.selectedUser.bio}</p> : "No Bio Provided"}
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
