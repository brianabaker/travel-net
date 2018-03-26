
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
    <div className="ui grid" style={sectionStyle}>
      <div className="six wide column"></div>
      <div className="four wide column"><SignIn/></div>
      <div className="six wide column"></div>
    </div>
  )
}

export default Splash
