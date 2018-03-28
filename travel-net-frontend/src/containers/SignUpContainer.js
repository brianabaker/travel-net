import React from 'react'
import image from '../images/small-world.jpeg'
import SignUp from '../users/SignUp'

const SignUpContainer = (props) => {
  let sectionStyle = {
      margin: 0,
      height: "100vh",
      width: "100%",
      backgroundSize: "cover",
      backgroundImage: `url(${image})`,
      marginTop: "-4rem"
    }
  return(
    <div className="ui grid" style={sectionStyle}>
      <div className="six wide column"></div>
      <div className="four wide column"><SignUp/></div>
      <div className="six wide column"></div>
    </div>
  )
}

export default SignUpContainer
