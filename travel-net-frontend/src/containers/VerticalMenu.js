import React from 'react'

import Friends from './Friends'
import {connect} from 'react-redux'
// right now this is a vertical menu

const VerticalMenu = (props) => {
  console.log(props)
  return(
    <div className="ui secondary vertical right menu">

      <a className="item">
        Friend 1
      </a>
      <a className="item">
        Item
      </a>
      <a className="item">
        Item
      </a>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {friends: state.users.friends
  }
}
export default connect(mapStateToProps)(VerticalMenu)
