// this is app routes

// packages
import React from "react";
import { Route, Switch} from "react-router-dom";

//components and containers
import App from "./App";
import NavBar from './NavBar'
import SignUp from './users/SignUp'
import SignIn from './users/SignIn'
import Welcome from './users/Welcome'
import Friends from './containers/Friends'
import Profile from './users/Profile'
import Trip from './trips/Trip'


// this is in charge of all the routes
const AppRoutes = (props) => {
   return (
     <React.Fragment>
       <NavBar/>
       <Switch>
         <Route exact path='/' component={App}/>
         <Route exact path="/signup" component={SignUp}/>
         <Route exact path="/signin" component={SignIn}/>
         <Route exact path="/welcome" component={Welcome}/>
         <Route exact path="/friends" component={Friends}/>
         <Route exact path="/trips" component={Trip}/>
         <Route path="/users/:userId" component={Profile}/>
      </Switch>
    </React.Fragment>
   )
}

export default AppRoutes;
