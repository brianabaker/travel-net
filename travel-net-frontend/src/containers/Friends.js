
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
import WorkingMap from '../maps/Hybrid'

/// i'm not sure what this is for anymore
// const handleClick = (e) => {
//   e.preventDefault()
//   props.viewFriendRequests(props.currentUser)
// }

// import FilterFriends  from '../FilterFriends'
class Friends extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.viewFriendRequests(this.props.currentUser)
  }

  componentDidMount(){
    this.props.fetchFriends(this.props.currentUser)
  }

  render(){
    return(
      <div className="ui stackable grid container">
        {this.props.friends ?
        <React.Fragment>
        <div className="two column row">
          <div className="column"><FindFriends/></div>
          <div className="column"><button onClick={this.handleClick} className="ui green button">See Friend Requests</button></div>
        </div>
        <div className="ten wide column">
          <WorkingMap friends={this.props.friends}/>
        </div>
        {this.props.friendRequests ?
          <div className="four wide column">
            <FriendRequests/>
          </div> :
        <div className="four wide column">
          {this.props.searchedUsers.length > 0 ? <SearchedUsers data={this.props.searchedUsers}/> : <ListFriends/>}
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
