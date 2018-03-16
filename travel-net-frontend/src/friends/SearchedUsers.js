
import React from 'react'

import { connect } from 'react-redux'
import { selectUser } from '../actions/users'
import {Link} from 'react-router-dom'
const SearchedUsers = (props) => {
// this is definitely broken
  let foundUsers = props.data.map(user => <li key={user.id}>
    <Link to={`users/${user.id}`}>{user.username}</Link></li>)

  return(
    <div>
      {foundUsers}
    </div>
  )
}

export default connect(null, { selectUser })(SearchedUsers)
