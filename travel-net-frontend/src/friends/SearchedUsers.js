
import React from 'react'

import { connect } from 'react-redux'
import { selectUser } from '../actions/users'

const SearchedUsers = (props) => {

  let foundUsers = props.data.map(user => <li key={user.id}>
    <a onClick={() => props.selectUser(user)}>{user.username}</a></li>)

  return(
    <div>
      {foundUsers}
    </div>
  )
}

export default connect(null, { selectUser })(SearchedUsers)
