
// packages
import React from 'react';
import { Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'

// styles
import './App.css';
import image from './images/small-world.jpeg'

//components
import AppRoutes from "./appRoutes";
import NavBar from './NavBar'
import SignUp from './users/SignUp'
import SignIn from './users/SignIn'
import FriendsMenu from './containers/FriendsMenu'
import Home from './containers/Home'
import ChatroomContainer from './friends/ChatroomContainer'
import FriendsChat from './friends/FriendsChat'
class App extends React.Component {

  state = {
    visible: false,
    friendId: ''
  }

  toggleChat = (id) => {
    console.log('in the toggle chat', id)
    this.setState({
      visible: !this.state.visible,
      friendId: id
    }, () => console.log(this.state.visible, id))
  }

  render() {
    let sectionStyle = {
        margin: 0,
        height: "100vh",
        backgroundSize: "cover",
        backgroundImage: `url(${image})`
      }

    return(
        <div>
          <NavBar/>
          <div id="add-padding" className="ui grid">
            <div className="two wide column">
              {this.props.friends ?
              <FriendsMenu toggleChat={this.toggleChat}/>
              : null }
            </div>
          <div id="main-container" className="twelve wide column">
            {this.state.visible ?
              <FriendsChat friendId={this.state.friendId}/>
              :
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/signin" component={SignIn}/>
              <AppRoutes />
            </Switch>
            }
          </div>
        </div>
       </div>
    )
  }
}
// <NavBar/>
// <div id="add-padding" className="ui grid">
//   <div className="two wide column">
//     {this.props.friends ?
//     <FriendsMenu toggleChat={this.toggleChat}/>
//     : null }
//   </div>
// <div id="main-container" className="twelve wide column">
//   <Switch>
//     <Route exact path='/' component={Home}/>
//     <Route exact path="/signup" component={SignUp}/>
//     <Route exact path="/signin" component={SignIn}/>
//     <AppRoutes />
//   </Switch>
// </div>
// </div>
//

const mapStateToProps = (state) => {
  return {friends: state.users.friends}
}

export default connect(mapStateToProps, null, null, {
  pure: false})(App)
