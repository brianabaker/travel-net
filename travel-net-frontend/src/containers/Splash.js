
import React from 'react'

import image from '../images/small-world.jpeg'

import SignIn from '../users/SignIn'

const Splash = (props) => {
  let sectionStyle = {
      margin: 0,
      height: "100vh",
      width: "100%",
      backgroundSize: "cover",
      backgroundImage: `url(${image})`
    }
  return(
    <div style={sectionStyle}>
      <div className="ui grid">
      <div className="six wide column"></div>
      <div className="four wide column"><SignIn/></div>
      <div className="six wide column"></div>
      </div>
    </div>
  )
}

export default Splash
