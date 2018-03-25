
// packages
import React from 'react'
import { connect } from 'react-redux'

// components
// import AllFriendsMap from '../allFriendsMap'
import FindFriends from '../friends/FindFriends'// this is the search component
import ListFriends from '../friends/ListFriends'

import FriendRequests from '../friends/FriendRequests'
import {viewFriendRequests, fetchFriends} from '../actions/users'
import FriendsMap from '../friends/FriendsMap'

import UserApi from '../services/userApi'

import {findAddress} from '../helpers'
// import FriendsMenu from './FriendsMenu'
// needed an empty map to show up as a quick fix if they had no friends. TODO
import EmptyMap from '../friends/EmptyMap'

class Friends extends React.Component {
  state = {
    // allFriends: [],
    filterFriends: [],
    cityName: '',
    erros: ''
  }

  // componentDidMount() {
  //   this.setState({
  //     allFriends: this.props.friends,
  //     filterFriends: this.props.friends
  //   })
  // }

  seeFriendRequests = (e) => {
    e.preventDefault()
    this.props.viewFriendRequests(this.props.currentUser)
  }

  friendsByLocation = (lat, lng) => {
    let friendsArray = this.props.friends.filter(friend => {
      return parseFloat(friend.lat) === lat && parseFloat(friend.lng) === lng
    })
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
      filterFriends: [],
      cityName: '',
      errors: ''
    })
  }

  searchUsers = (query) => {
    UserApi.searchUsers(query)
    .then(searchResults => {
      console.log("results", searchResults.length)
      if (searchResults.length <= 0) {
        this.setState({
          errors: "No results found!"
        })
      } else {
        this.setState({
          filterFriends: searchResults
        })
      }
    })
  }

  render(){

    return(
      <React.Fragment>
        <div className="ui grid">
        {this.props.friends ?
      <React.Fragment>
        <div className="twelve wide column">
        {this.props.friends.length > 0 ?
            <FriendsMap friends={this.props.friends} cb={this.friendsByLocation} undo={this.undoFriendsByLocation}/>
            :
            <EmptyMap/>
        }
        </div>
        <div className="three wide column">
          <FindFriends errors={this.state.errors} search={this.searchUsers} undo={this.undoFriendsByLocation}/>
          <button onClick={this.seeFriendRequests} className="ui small green button">See Friend Requests</button>
        {this.props.friendRequests ?
            <FriendRequests/> :
            <ListFriends friends={this.state.filterFriends} filterFriends={this.state.filterFriends} city={this.state.cityName}/>
        }
        </div>
      </React.Fragment>
      :
      "Loading"}
      </div>
      </React.Fragment>
    )
  }
}

// <div className="ui centered column"><FindFriends errors={this.state.errors} search={this.searchUsers} undo={this.undoFriendsByLocation}/></div>
// <div className="ui centered column"><button onClick={this.seeFriendRequests} className="ui green button">See Friend Requests</button></div>

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          isLoading: state.users.isLoading,
          friends: state.users.friends,
          friendRequests: state.users.friendRequests,
          searchedUsers: state.users.searchedUsers}
}

export default connect(mapStateToProps, {viewFriendRequests, fetchFriends})(Friends)
