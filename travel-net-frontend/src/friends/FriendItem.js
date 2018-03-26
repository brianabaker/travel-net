import React from 'react'

import {connect} from 'react-redux'

// import Friends from './Friends'
// import VerticalMenu from './VerticalMenu'
import {selectUser} from '../actions/users'
class FriendItem extends React.Component {

  state = {
    menuId: ''
  }

  toggleMenu = (id) => {
    this.setState({
      menuId: this.state.menuId === id ? null : id
    }, () => console.log('menu id', this.state.menuId))
  }


  render() {
      let itemClass = this.props.currentChatId === this.props.id ? "active item" : "item"
      console.log(this.props.id)
    return(
      <React.Fragment>
        <div className="ui left pointing dropdown link item" onClick={() => this.toggleMenu(this.props.id)}>{this.props.name}</div>
          {this.state.menuId === this.props.id ?
          <div className="menu">
            <a className="item" onClick={() => this.props.selectUser(this.props.id)}>Profile</a>
            <a className="item" onClick={() => this.props.toggleVisibility(this.props.id)}>Chat</a>
          </div>
          : null }
      </React.Fragment>
    )
  }
}

export default connect(null, {selectUser})(FriendItem)
