import React from 'react'

import RenderLocation from './RenderLocation'
import ProfileImage from './ProfileImage'
// import RenderProfileTripMap from './RenderProfileTripMap'

const RenderProfileInfo = (props) => {
  return(
    <React.Fragment>
      <ProfileImage profilePic={props.selectedUser.profile_pic_url}/>
      <h4 className="ui header">{props.selectedUser.username}</h4>
      {props.displayTraveling()}
      <RenderLocation lat={props.selectedUser.lat} lng={props.selectedUser.lng}/>
      {props.selectedUser.bio ? <p>{props.selectedUser.bio}</p> : "No Bio Provided"}
    </React.Fragment>
  )
}

export default RenderProfileInfo
