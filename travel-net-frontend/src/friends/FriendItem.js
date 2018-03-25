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
      let itemClass = this.props.currentChatId === this.props.id ? "active item" : "item"
    return(
      <div>
        <a onClick={() => this.props.toggleVisibility(this.props.id)} className={itemClass}>{this.props.name}</a>
      </div>
    )
  }
}

export default FriendItem
