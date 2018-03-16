

import React from 'react'
import {connect} from 'react-redux'
import {fetchFriends} from '../actions/users'

import UserItem from './UserItem'
class ListFriends extends React.Component {

// NEED TO ADD LOADING HERE

  componentDidMount(){
    this.props.fetchFriends(this.props.currentUser)
  }

  render() {
    // const friends = this.props.friends.map(friend => <li>friend.username</li>)
    return(
      <div>
        <h4>Friends List</h4>
          {this.props.friends ? this.props.friends.map(friend => <UserItem key={friend.id} data={friend}/>) : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          isLoading: state.users.isLoading,
          friends: state.users.friends}
}

export default connect(mapStateToProps, {fetchFriends})(ListFriends)
