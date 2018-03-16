
import React from 'react'
import {connect} from 'react-redux'
import {requestFriendship, fetchProfile} from '../actions/users'
// import {fetchFriends} from '../actions/users'

class Profile extends React.Component {  
  componentDidMount(){
    let id = parseInt(this.props.match.params.userId, 10)
    this.props.fetchProfile(this.props.currentUser, id)
  }

  checkFriendship = () => {
    let result = ''
    if (this.props.friends && this.props.selectedUser) {
      return this.props.friends.find(friend => {
        return friend === this.props.selectedUser
          result = true
      })
    } else if (this.props.friends && this.props.selectedUser) {
      return this.props.friends.find(friend => {
        return friend !== this.props.selectedUser
           result = false
    })
  }
  return result
}

  // console.log("PROFILE PROPS, ",  this.props.match.params.userId, this.currentProfile())
  //
  // const selectedUser = this.currentProfile()
  // if (!this.props.friends){
  //   return "loading"
  // }
  render() {
    return(
      <div>
        {this.props.alert ? (
          <div className="ui positive message">
            {this.props.alert.message}
          </div>)
          : null}
          {this.props.isLoading ? "Loading" :
            <React.Fragment>
              <h4>{this.props.selectedUser.username}</h4>
              {this.checkFriendship ? "Button To Remove friend Here" :
                <button onClick={() => this.props.requestFriendship(this.props.currentUser)}>Add Friend</button>
              }
              <p>Bio here</p>
            </React.Fragment>
          }
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  console.log("STATE", state)
  return {currentUser: state.users.currentUser,
          alert: state.users.alert,
          isLoading: state.users.isLoading,
          selectedUser: state.users.selectedUser,
          friends: state.users.friends}
}

export default connect(mapStateToProps, {fetchProfile, requestFriendship})(Profile)
