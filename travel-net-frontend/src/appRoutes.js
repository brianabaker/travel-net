// this is app routes

// packages and etc
import React from "react";
import { Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'
import {fetchFriends} from './actions/users'

// components
import Welcome from './users/Welcome'
import Friends from './containers/Friends'
import Profile from './users/Profile'
import TripsContainer from './containers/Trips'
import Trip from './trips/Trip'

class AppRoutes extends React.Component {

  componentDidMount(){
    this.props.fetchFriends(this.props.currentUser.user)
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
