// this is app routes

// packages
import React from "react";
import { Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'

//components and containers
// import App from "./App";
// import NavBar from './NavBar'
// import SignUp from './users/SignUp'
// import SignIn from './users/SignIn'
import Welcome from './users/Welcome'
import Friends from './containers/Friends'
import Profile from './users/Profile'
import TripsContainer from './containers/Trips'
import Trip from './trips/Trip'
import {fetchFriends} from './actions/users'


// this is in charge of all the routes

class AppRoutes extends React.Component {

  componentDidMount(){
    this.props.fetchFriends(this.props.currentUser.user)
    console.log('component mount')
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/welcome" component={Welcome}/>
          <Route exact path="/friends" component={Friends}/>
          <Route path="/trips/:tripId" component={Trip}/>
          <Route exact path="/trips" component={TripsContainer}/>
          <Route path="/users/:userId" component={Profile}/>
       </Switch>
     </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps, {fetchFriends})(AppRoutes)
