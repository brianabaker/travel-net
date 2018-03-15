
import React from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import {selectUser} from '../actions/users'

const UserItem = (props) => {
  console.log(props)
  return(
    <div>
      <li><a onClick={() => props.selectUser(props.data)}>{props.data.username}</a></li>
    </div>
  )
}

export default connect(null, {selectUser})(UserItem)
