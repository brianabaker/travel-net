
import React from 'react'
import { Link } from "react-router-dom"

import {connect} from 'react-redux'
import {signOut} from './actions/users'

const NavBar = (props) => {
  console.log(props)
  return(
    <div className="ui menu" style={{marginBottom: "0px"}}>
        <React.Fragment>
      <div className="header item">
        TravelNet
      </div>
      <Link to='/' className="item">
        Home
      </Link>
      <Link to='/friends' className="item">
        Your Friends
      </Link>
      <Link to='/trips' className="item">
        Your Trips
      </Link>
      <div className="right menu">
        {props.currentUser ?
        <React.Fragment>
          <Link to={`/users/${props.currentUser.id}`} className="item">{props.currentUser.username}</Link>
          <a onClick={() => props.signOut()} className="ui item">
            SignOut
          </a>
        </React.Fragment>
        :
        <Link to='/signin' className="item">
          SignIn
        </Link>  }
      </div>
      </React.Fragment>
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
