import React from 'react'

import {connect} from 'react-redux'

// import Friends from './Friends'
// import VerticalMenu from './VerticalMenu'

class FriendItem extends React.Component {
  // state = {
  //   visible: false
  // }
  //
  // toggleVisibility = () => {
  //     this.setState({
  //       visible: !this.state.visible
  //     }, () => console.log(this.state.visible))
  //   }

  render() {
    return(
      <div>
      <a onClick={() => this.props.toggleVisibility(this.props.id)} className="item">{this.props.name}</a>
      </div>
    )
  }
}

export default FriendItem
