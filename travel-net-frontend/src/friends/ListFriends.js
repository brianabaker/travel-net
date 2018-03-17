

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
    console.log(this.props)
    // const friends = this.props.friends.map(friend => <li>friend.username</li>)
    return(
      <div>
        <h4>Friends List</h4>
          {this.props.friends ?
          <React.Fragment>
            {this.props.data ?
            this.props.data.map(friend => <UserItem key={friend.id} data={friend}/>) :
            this.props.friends.map(friend => <UserItem key={friend.id} data={friend}/>)}
          </React.Fragment>
          : "Loading" }
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
