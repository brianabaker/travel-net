
import React from 'react'

import { connect } from 'react-redux'

const FilterFriends = (props) => {
  let friend = props.friends.map(friend => friend)
  return(
    <div>
      {friend}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {friends: state.users.friends }
}

export default connect(mapStateToProps)(FilterFriends)
