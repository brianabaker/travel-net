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
import EditProfile from './users/EditProfile'
import About from './containers/About'

class LoggedInRoutes extends React.Component {

  componentDidMount(){
    this.props.fetchFriends(this.props.currentUser)
  }

  render() {
    return (
      <React.Fragment>
        <div id="main-container" className="fourteen wide column">
          <Switch>
            <Route exact path="/welcome" component={Welcome}/>
            <Route exact path='/about' component={About}/>
            <Route path="/friends" component={Friends}/>
            <Route path="/trips/:tripId" component={Trip}/>
            <Route exact path="/trips" component={TripsContainer}/>
            <Route path="/users/:userId" component={Profile}/>
            <Route exact path="/edit" component={EditProfile}/>
         </Switch>
       </div>
     </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps, {fetchFriends})(LoggedInRoutes)
