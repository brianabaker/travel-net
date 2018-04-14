import React from 'react'
import Image from '../images/profile-pic-empty.gif'

const ProfileImage = (props) => {

  const renderImage = () => {
    if (props.profilePic) {
      return (
        <img src={props.profilePic} alt="profile pic" style={{height: "300px", width: "300px"}}/>
      )
    } else {
      return (
        <img src={Image} alt="profile pic" style={{height: "300px", width: "300px"}}/>
      )
    }
  }

  return(
    <div>
      {renderImage()}
    </div>
  )
}

export default ProfileImage
