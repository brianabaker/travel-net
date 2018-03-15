
import React from "react"
import { connect } from "react-redux"

const Welcome = (props) => {
  console.log(props)
  return(
    <div>
      Welcome {props.currentUser.username}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps)(Welcome)
