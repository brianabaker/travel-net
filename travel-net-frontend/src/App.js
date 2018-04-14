
// react, routing
import React from 'react';
import {connect} from 'react-redux'
import {showChat} from './actions/chats'
import AllRoutes from './AllRoutes'

// styles
import './App.css';

//components
import NavBar from './NavBar'
import FriendsMenu from './containers/FriendsMenu'
import ChatroomContainer from './friends/ChatroomContainer'

class App extends React.Component {
  state = {
    friendId: ''
  }

  toggleChat = (id) => {
    this.setState({
      friendId: this.state.friendId === id ? null : id
    })
  }

  render() {

    return(
        <div className="add-padding">
          <NavBar/>
          <div className="ui grid">
            <div className="two wide column">
              {this.props.friends ?
                  <FriendsMenu friendId={this.state.friendId} toggleChat={this.toggleChat} />
              : null }
            </div>
            {this.state.friendId ?
              <div className="sticky-side-chat">
                <ChatroomContainer friendId={this.state.friendId}/>
              </div>
              : null }
              <AllRoutes/>
        </div>
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {friends: state.users.friends}
}

export default connect(mapStateToProps, {showChat}, null, {
  pure: false})(App)
