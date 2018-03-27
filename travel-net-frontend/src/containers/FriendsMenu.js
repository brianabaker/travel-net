import React from 'react'

import {connect} from 'react-redux'

import FriendItem from '../friends/FriendItem'

class FriendsMenu extends React.Component {
  // state = {
  //   friendId: ''
  // }
  // state = {
  //   menuId: ''
  // }
  //
  // toggleMenu = (id) => {
  //   this.setState({
  //     menuId: this.state.menuId === id ? null : id
  //   }, () => console.log('menu id', this.state.menuId))
  // }

  toggleVisibility = (id) => {
    this.props.toggleChat(id)
      // this.setState({
      //   friendId: id
      // }, () => console.log(this.state.friendId))
    }


    checkFriends = () => {
      if (this.props.friends.length > 0) {
        return(
          this.props.friends.map(friend =>
            <FriendItem key={friend.id} lat={friend.lat} lng={friend.lng} id={friend.id} currentChatId={this.props.friendId} toggleVisibility={this.toggleVisibility} name={friend.username}/>
          )
        )
      } else {
        return(
          <div>
          </div>
        )
      }
    }

  render() {
    // console.log(this.props.history)
    return(
      <React.Fragment>
        <div className="ui borderless secondary stackable vertical menu sticky-side-bar">
          {this.checkFriends()}
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
