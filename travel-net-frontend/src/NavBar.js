
import React from 'react'

import { Link } from "react-router-dom"

const NavBar = (props) => {
  return(
    <div className="ui menu">
      <div className="header item">
        TravelNet
      </div>
      <a className="item">
        Home
      </a>
      <a className="item">
        Your Friends
      </a>
      <div className="right menu">
        <a className="item">
          SignIn
        </a>
      </div>
    </div>
  )
}

export default NavBar
