import React from 'react'

import honeymoonMP4 from '../images/Honeymoon.mp4'
import honeymoonOGV from '../images/Honeymoon.mp4'

class FrontPage extends React.Component {

  render() {
    return (
      <video id="background-video" loop autoPlay>
         <source src={honeymoonMP4} type="video/mp4" />
         <source src={honeymoonOGV} type="video/ogg" />
         Your browser does not support the video tag.
      </video>
    )
  }
}

export default FrontPage
