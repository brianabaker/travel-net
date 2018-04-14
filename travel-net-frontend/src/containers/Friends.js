
// packages
import React from 'react'
import { connect } from 'react-redux'

// components
import FindFriends from '../friends/FindFriends'
import ListFriends from '../friends/ListFriends'

import FriendRequests from '../friends/FriendRequests'
import {viewFriendRequests, fetchFriends} from '../actions/users'
import FriendsMap from '../friends/FriendsMap'

import UserApi from '../services/userApi'

import {findAddress} from '../helpers'
import EmptyMap from '../friends/EmptyMap'

class Friends extends React.Component {
  state = {
    filterFriends: [],
    cityName: '',
    erros: '',
    center: {lat: 31.343431, lng: 3.924604},
    zoom: 2
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.location.state) {
      if (this.props.location.state !== nextProps.location.state) {
        if (nextProps.location.state.detail) {
          let lat = parseFloat(nextProps.location.state.detail.lat)
          let lng = parseFloat(nextProps.location.state.detail.lng)
          this.setState({
            center: {lat: lat, lng: lng},
            zoom: 10
          })
        }
      }
    }
    if (nextProps.location.state == null) {
        this.setState({
          center: {lat: 31.343431, lng: 3.924604},
          zoom: 2
      })
    }
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
      filterFriends: [],
      cityName: '',
      errors: ''
    })
  }

  searchUsers = (query) => {
    console.log('search', query)
    UserApi.searchUsers(this.props.currentUser.id, query)
    .then(searchResults => {
      console.log('results', searchResults)
      if (searchResults.length <= 0) {
        this.setState({
          errors: "No results found!"
        })
      } else {
        this.setState({
          filterFriends: searchResults
        }, () => console.log('search users', this.state.filterFriends))
      }
    })
  }

  render(){

    return(
      <React.Fragment>
        <div className="ui grid">
      <React.Fragment>
        <div className="twelve wide column">
        {!this.props.friends ? <EmptyMap/> :
            <FriendsMap zoom={this.state.zoom} center={this.state.center} friends={this.props.friends} cb={this.friendsByLocation} undo={this.undoFriendsByLocation}/>
        }
        </div>
        <div className="three wide column">
          <FindFriends errors={this.state.errors} search={this.searchUsers} undo={this.undoFriendsByLocation}/>
          <button onClick={this.seeFriendRequests} className="ui small green button" style={{    margin: "5px"}}>See Friend Requests</button>
        {this.props.friendRequests ?
            <FriendRequests/> :
            <ListFriends friends={this.state.filterFriends} filterFriends={this.state.filterFriends} city={this.state.cityName}/>
        }
        </div>
      </React.Fragment>
      </div>
      </React.Fragment>
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
