
import React from "react"
import { connect } from "react-redux"

const Welcome = (props) => {

  return(
    <div id="welcome">
      Welcome {props.currentUser.username}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps)(Welcome)
