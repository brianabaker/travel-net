
import React from "react"
import { connect } from "react-redux"

const Welcome = (props) => {
  console.log("welcome", props.currentUser.user.username)
  return(
    <div>
      Welcome {props.currentUser.user.username}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps)(Welcome)
