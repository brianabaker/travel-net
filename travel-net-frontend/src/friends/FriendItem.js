import React from 'react'

import {connect} from 'react-redux'

// import Friends from './Friends'
// import VerticalMenu from './VerticalMenu'
import {fetchProfile, selectUser, showFriendOnMap} from '../actions/users'
class FriendItem extends React.Component {

  state = {
    menuId: ''
  }

  toggleMenu = (id) => {
    this.setState({
      menuId: this.state.menuId === id ? null : id
    })
  }


  render() {
      let itemClass = this.props.currentChatId === this.props.id ? "active item" : "item"
      console.log('herehehr', this.props)
    return(
      <React.Fragment>
        <div className="ui left pointing dropdown link item" onClick={() => this.toggleMenu(this.props.id)}>{this.props.name}</div>
          {this.state.menuId === this.props.id ?
          <div className="menu">
            <a className="item" onClick={() => this.props.showFriendOnMap(this.props.lat, this.props.lng)}>View on Map</a>
            <a className="item" onClick={() => this.props.fetchProfile(this.props.currentUser, this.props.id)}>Profile</a>
            <a className="item" onClick={() => this.props.toggleVisibility(this.props.id)}>Chat</a>
          </div>
          : null }
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          }
}
export default connect(mapStateToProps, {fetchProfile, showFriendOnMap})(FriendItem)
