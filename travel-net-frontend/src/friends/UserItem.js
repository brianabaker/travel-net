
import React from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import {selectUser} from '../actions/users'

// maybe put an if/else here to show if it's rendering serched for users of your friends

const UserItem = (props) => {
  return(
    <div>
      <li><Link to={`users/${props.data.id}`}>{props.data.username}</Link></li>
    </div>
  )
}

export default connect(null, {selectUser})(UserItem)
