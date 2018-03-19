
// packages
import React from 'react'
import { connect } from 'react-redux'

// components
// import AllFriendsMap from '../allFriendsMap'
import FindFriends from '../friends/FindFriends'// this is the search component
import ListFriends from '../friends/ListFriends'
import SearchedUsers from '../friends/SearchedUsers'
import FriendRequests from '../friends/FriendRequests'
import {viewFriendRequests, fetchFriends} from '../actions/users'
import WorkingMap from '../friends/FriendsMap'

import {findAddress} from '../helpers'


// import FindAddress from '../findAddress'
/// i'm not sure what this is for anymore
// const handleClick = (e) => {
//   e.preventDefault()
//   props.viewFriendRequests(props.currentUser)
// }

// import FilterFriends  from '../FilterFriends'
class Friends extends React.Component {
  state = {
    filterFriends: '',
    cityName: ''
  }

  seeFriendRequests = (e) => {
    e.preventDefault()
    this.props.viewFriendRequests(this.props.currentUser)
  }

  componentDidMount(){
    this.props.fetchFriends(this.props.currentUser)
  }

  friendsByLocation = (lat, lng) => {
    let friendsArray = this.props.friends.filter(friend => friend.lat == lat && friend.lng == lng)
    this.setState({
      filterFriends: friendsArray
    })
    findAddress(lat, lng).then(res =>
      this.setState({
        cityName: res
      })
    )
  }


  undoFriendsByLocation = () => {
    this.setState({
      filterFriends: this.state.friends,
      cityName: ''
    })
  }

  render(){
    return(
      <div className="ui stackable grid container">
        {this.props.friends ?
        <React.Fragment>
        <div className="two column row">
          <div className="column"><FindFriends/></div>
          <div className="column"><button onClick={this.seeFriendRequests} className="ui green button">See Friend Requests</button></div>
        </div>
        <div className="ten wide column">
          <WorkingMap friends={this.props.friends} cb={this.friendsByLocation} undo={this.undoFriendsByLocation}/>
        </div>
        {this.props.friendRequests ?
          <div className="four wide column">
            <FriendRequests/>
          </div> :
        <div className="four wide column">
          {this.props.searchedUsers.length > 0 ? <SearchedUsers data={this.props.searchedUsers}/> : <ListFriends data={this.state.filterFriends} city={this.state.cityName}/>}
        </div>
        }
        </React.Fragment>
        :
        "Loading"}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          friends: state.users.friends,
          friendRequests: state.users.friendRequests,
          searchedUsers: state.users.searchedUsers}
}

export default connect(mapStateToProps, {viewFriendRequests, fetchFriends})(Friends)
