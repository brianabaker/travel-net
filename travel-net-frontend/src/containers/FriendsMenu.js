import React from 'react'

import {connect} from 'react-redux'

// import Friends from './Friends'
import VerticalMenu from './VerticalMenu'
import FriendItem from '../friends/FriendItem'

class FriendsMenu extends React.Component {
  state = {
    friendId: ''
  }

  toggleVisibility = (id) => {
    this.props.toggleChat(id)
      this.setState({
        friendId: id
      }, () => console.log(this.state.friendId))
    }

  render() {
    return(
      <React.Fragment>
        <div className="ui fluid borderless secondary stackable vertical menu">
          <p className="item">Friends List</p>
        {this.props.friends.map(friend => {
            return <FriendItem key={friend.id} id={friend.id} toggleVisibility={this.toggleVisibility} name={friend.username}/>
              })}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {friends: state.users.friends}
}

export default connect(mapStateToProps)(FriendsMenu)


//   render() {
//     return(
//       <React.Fragment>
//       <div className="ui pointing left fixed vertical menu">
//         {this.props.friends.map(friend => {
//           return <a key={friend.id} className="item">
//               {friend.username}
//               </a>
//             })}
//         </div>
//       </React.Fragment>
//     )
//   }
// }
//
// \
// export default connect(mapStateToProps)(FriendsMenu)
