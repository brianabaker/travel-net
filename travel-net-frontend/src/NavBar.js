
import React from 'react'
import { Link } from "react-router-dom"

import {connect} from 'react-redux'
import {signOut} from './actions/users'

const NavBar = (props) => {
  return(
    <div className="ui menu" style={{marginBottom: "0px"}}>
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
        <Link to='/signin' className="item">
          SignIn
        </Link>
        <a onClick={() => props.signOut()} className="ui item">
          SignOut
        </a>
      </div>
    </div>
  )
}


export default connect(null, {signOut})(NavBar)
