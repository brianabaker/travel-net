
import React from 'react'
import {connect} from 'react-redux'
import {requestFriendship, fetchProfile} from '../actions/users'
import {fetchTripMap} from '../actions/trips'
import TripMap from '../trips/TripMap'
import RenderButton from './RenderButton'
import RenderProfileTripMap from './RenderProfileTripMap'
import RenderProfileInfo from './RenderProfileInfo'
import {withRouter} from 'react-router-dom'

class Profile extends React.Component {
  state = {
    sameUser: false,
    location: '',
    tripLocations: '',
    requestedFriendshipBoolean: false
  }

  componentDidMount(){
    this.props.fetchProfile(this.props.currentUser, this.props.match.params.userId)
    this.requestFriendshipFunction()
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('INSIDE THE RECEIVE PROPS', this.props)
  //   // if (this.props.match.params.userId !== nextProps.match.params.userId) {
  //   //   this.props.fetchProfile(this.props.currentUser, nextProps.match.params.userId)
  //   //   this.requestFriendshipFunction()
  //   //    this.forceUpdate();
  //   // }
  //   // if (this.props.currentUser !== nextProps.currentUser){
  //   //   this.props.fetchProfile(nextProps.currentUser, nextProps.match.params.userId)
  //   //   this.requestFriendshipFunction()
  //   // }
  // }

  //it wasn't loading the next user on page refresh... i used to have it all saved in localStorage and then Meryl told me not too...

  requestFriendshipFunction = () => {
    if (this.props.currentUserPendingFriendsArray) {
      let requestedFriendshipBoolean = this.props.currentUserPendingFriendsArray.map(friend => friend.id).includes(this.props.selectedUser.id)
      this.setState({
        requestedFriendshipBoolean: requestedFriendshipBoolean
      })
    }
  }

  checkTraveling = () => {
    if (this.props.selectedUser.on_trip) {
      this.props.fetchTrip(this.props.selectedUser.current_trip_id)
    }
  }

  requestFriendship = () => {
    let friendId = parseInt(this.props.match.params.userId, 10)
    let userId = parseInt(this.props.currentUser.id, 10)
    this.props.requestFriendship(userId, friendId)
  }

  displayTraveling = () => {
    if (this.props.selectedUser.on_trip){
      return (<h4 className="ui header">
        <React.Fragment>
          Traveling
          {this.props.selectedUser.id === this.props.currentUser.id ?
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

  checkButton = () => {
    if (this.props.selectedFriendsWithCurrentUser === true) {
      return(
        <RenderButton text={"remove friend"}/>
      )
    } else if ((this.props.currentUser.id !== this.props.selectedUser.id) && (this.state.requestedFriendshipBoolean === false)) {
      return(
        <RenderButton text={"add friend"} function={this.requestFriendship}/>
      )
    } else if (this.props.currentUser.id === this.props.selectedUser.id) {
      return(
        <RenderButton text={"edit profile"} function={() => this.props.history.push('/edit')}/>
      )
    } else if (this.state.requestedFriendshipBoolean === true) {
      return (
        <RenderButton text={"sent friend request"}/>
      )
    }
  }

  renderMap = () => {
    if (this.props.selectedUser.on_trip){
      return(
        <RenderProfileTripMap friends={this.props.selectedFriendsWithCurrentUser} selectedUser={this.props.selectedUser}/>
      )
    }
  }

  renderAlert = () => {
    if (this.props.alert) {
      <div className="ui positive message">
        {this.props.alert.message}
      </div>
    }
  }

  render() {
    if (this.props.isLoading === true){
      return (
        <div>Loading</div>
      )
    }
    return(
      <div>
        {this.props.selectedUser ?
        <React.Fragment>
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
                <RenderProfileInfo displayTraveling={this.displayTraveling} selectedUser={this.props.selectedUser}/>
              </div>
              <div className="eight wide column">
                {this.renderMap()}
              </div>
            </React.Fragment>

          </React.Fragment>
        </div>
        </React.Fragment>
        : null }
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          alert: state.users.alert,
          isLoading: state.users.isLoading,
          tripLocations: state.trips.tripLocations,
          friends: state.users.friends,
          selectedUser: state.users.selectedUser,
          currentUserPendingFriendsArray: state.users.currentUserPendingFriendsArray,
          selectedFriendsWithCurrentUser: state.users.selectedFriendsWithCurrentUser
          }
}

const ConnectedProfile = withRouter(connect(mapStateToProps, {fetchProfile, requestFriendship, fetchTripMap})(Profile));
export default ConnectedProfile;
