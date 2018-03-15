
// packages
import React from 'react'
import { connect } from 'react-redux'

// components
import AllFriendsMap from '../allFriendsMap'
import FindFriends from '../friends/FindFriends'
import ListFriends from '../friends/ListFriends'
import SearchedUsers from '../friends/SearchedUsers'
import FriendRequests from '../friends/FriendRequests'
import {viewFriendRequests} from '../actions/users'

// const handleClick = (e) => {
//   e.preventDefault()
//   props.viewFriendRequests(props.currentUser)
// }

const Friends = (props) => {
  const handleClick = (e) => {
    e.preventDefault()
    props.viewFriendRequests(props.currentUser)
  }

  return(
    <div className="ui stackable grid container">
      <div className="two column row">
        <div className="column"><FindFriends/></div>
        <div className="column"><button onClick={handleClick} className="ui green button">See Friend Requests</button></div>
      </div>
      <div className="ten wide column">
        <AllFriendsMap/>
      </div>
      {props.friendRequests ?
        <div className="four wide column">
          <FriendRequests/>
        </div> :
      <div className="four wide column">
        {props.searchedUsers.length > 0 ? <SearchedUsers data={props.searchedUsers}/> : <ListFriends/>}
      </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
        friendRequests: state.users.friendRequests,
          searchedUsers: state.users.searchedUsers}
}

export default connect(mapStateToProps, {viewFriendRequests})(Friends)
