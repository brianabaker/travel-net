
import React from 'react'

import { Link } from "react-router-dom"
import UserApi from './services/userApi'

const NavBar = (props) => {
  return(
    <div className="ui menu">
      <div className="header item">
        TravelNet
      </div>
      <a className="item">
        Home
      </a>
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
        <a onClick={() => UserApi.signOut()} className="ui item">
          SignOut
        </a>
      </div>
    </div>
  )
}

export default NavBar
