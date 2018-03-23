
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

// needed an empty map to show up as a quick fix if they had no friends. TODO
import EmptyMap from '../friends/EmptyMap'

class Friends extends React.Component {
  state = {
    allFriends: [],
    filterFriends: [],
    cityName: '',
    erros: ''
  }

  componentDidMount() {
    this.setState({
      allFriends: this.props.friends,
      filterFriends: this.props.friends
    })
  }

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
      filterFriends: this.state.allFriends,
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
      <div id="add-padding">
      <div className="ui stackable grid container">
        {this.props.friends ?
      <React.Fragment>
        <div className="two column row">
          <div className="column"><FindFriends errors={this.state.errors} search={this.searchUsers} undo={this.undoFriendsByLocation}/></div>
          <div className="column"><button onClick={this.seeFriendRequests} className="ui green button">See Friend Requests</button></div>
        </div>
        <div className="ten wide column">
        {this.props.friends.length > 0 ?
          <FriendsMap friends={this.props.friends} cb={this.friendsByLocation} undo={this.undoFriendsByLocation}/>
          :
          <EmptyMap/>
        }
        </div>
        {this.props.friendRequests ?
          <div className="four wide column">
            <FriendRequests/>
          </div> :
        <div className="four wide column">
            <ListFriends friends={this.state.filterFriends} city={this.state.cityName}/>
        </div>
        }
      </React.Fragment>
      :
      "Loading"}
      </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          isLoading: state.users.isLoading,
          friends: state.users.friends,
          friendRequests: state.users.friendRequests,
          searchedUsers: state.users.searchedUsers}
}

export default connect(mapStateToProps, {viewFriendRequests, fetchFriends})(Friends)
