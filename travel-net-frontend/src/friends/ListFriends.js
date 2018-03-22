

import React from 'react'
import {connect} from 'react-redux'
import UserItem from './UserItem'

class ListFriends extends React.Component {

  render() {
    console.log('list friends', this.props)

    return(
      <div>
        <h4>Friends List</h4>
          {this.props.city ? <h4>{this.props.city}</h4> : null }
          <React.Fragment>
          {this.props.friends.length > 0 ?
            this.props.friends.map(friend => <UserItem key={friend.id} data={friend}/>)
          : "No Friends Yet" }
          </React.Fragment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          isLoading: state.users.isLoading}
}

export default connect(mapStateToProps)(ListFriends)
