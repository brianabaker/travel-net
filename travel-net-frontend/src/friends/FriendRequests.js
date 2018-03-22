
import React from 'react'

import { connect } from 'react-redux'
import {positiveResponseFriendRequest, returnToFriendsMenu} from '../actions/users'

const FriendRequests = (props) => {

  let requestList = ''
  {props.friendRequests.length > 0 ?
     requestList = props.friendRequests.map(request => {
      console.log(request)
      return (<li key={request.id}>{request.username} <a onClick={() => props.positiveResponseFriendRequest(props.currentUser, request)}>Add Friend</a></li>)
    })
    : requestList = "No pending friend requests"}

  return(
    <div>
      <div onClick={props.returnToFriendsMenu}>
        <i className="window close outline icon"></i>Return to Friends
      </div>
        {requestList}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          friendRequests: state.users.friendRequests}
}
export default connect(mapStateToProps, {positiveResponseFriendRequest, returnToFriendsMenu})(FriendRequests)
