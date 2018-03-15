
import React from 'react'
import {connect} from 'react-redux'
import {requestFriendship} from '../actions/users'

const Profile = (props) => {
  console.log(props)
  return(
    <div>
        {props.alert ? (
          <div className="ui positive message">
              {props.alert.message}
          </div>)
          : null}
        <h4>{props.selectedUser.username}</h4>
        <button onClick={() => props.requestFriendship(props.currentUser, props.selectedUser)}>Add Friend</button>
        <p>Bio here</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {selectedUser: state.users.selectedUser,
          currentUser: state.users.currentUser,
          alert: state.users.alert}
}

export default connect(mapStateToProps, {requestFriendship})(Profile)
