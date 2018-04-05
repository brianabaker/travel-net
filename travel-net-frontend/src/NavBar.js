
import React from 'react'
import { Link } from "react-router-dom"

import {connect} from 'react-redux'
import {signOut} from './actions/users'


const NavBar = (props) => {
  console.log(props.currentUser)
  const ifCurrentUser = () => {
    if (props.currentUser) {
      return(
        <React.Fragment>
          <Link to='/about' className="item" id="nav-bar-item">
            About
          </Link>
          <Link to='/friends' className="item" id="nav-bar-item">
            Your Friends
          </Link>
          <Link to='/trips' className="item" id="nav-bar-item">
            Your Trips
          </Link>
          <div className="right menu">
          <Link to={`/users/${props.currentUser.id}`} className="item" id="nav-bar-item">{props.currentUser.username}</Link>
          <a onClick={() => props.signOut()} className="ui item" id="nav-bar-item">
            SignOut
          </a>
        </div>
        </React.Fragment>
      )
    }
  }

  return(
    <div className="ui menu sticky-nav" style={{marginBottom: "0px"}}>
      <div className="header item" id="nav-bar-item">
        TravelNet
      </div>
      {ifCurrentUser()}
    </div>
  )
}

//     <Link to={`/users/${props.currentUser.id}`} className="item">{props.currentUser.username}</Link>
// {this.props.currentUser ?
// <Link to={`/profile/${currentUser.user.id}`}>{currentUser.user.username}</Link>
// : null  }

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          isLoading: state.users.isLoading}
}


export default connect(mapStateToProps, {signOut})(NavBar)
