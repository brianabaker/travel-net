import React from 'react'

import {connect} from 'react-redux'

import FriendItem from '../friends/FriendItem'

class FriendsMenu extends React.Component {
  // state = {
  //   friendId: ''
  // }

  toggleVisibility = (id) => {
    this.props.toggleChat(id)
      // this.setState({
      //   friendId: id
      // }, () => console.log(this.state.friendId))
    }

  render() {
    // console.log(this.props.history)
    return(
      <React.Fragment>
        <div className="ui borderless secondary stackable vertical menu sticky-side-bar">
          <p className="item">Friends List</p>
        {this.props.friends.map(friend => {
            return <FriendItem key={friend.id} id={friend.id} currentChatId={this.props.friendId} toggleVisibility={this.toggleVisibility} name={friend.username}/>
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
