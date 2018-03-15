// this is app routes

// packages
import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { push } from 'react-router-redux'

//components and containers
import App from "./App";
import NavBar from './NavBar'
import SignUp from './users/SignUp'
import SignIn from './users/SignIn'
import Welcome from './users/Welcome'
import Friends from './containers/Friends'



// this is in charge of all the routes
const AppRoutes = (props) => {
 return (
     <div>
       <NavBar/>
       <Switch>
         <Route exact path='/' component={App}/>
         <Route exact path="/signup" component={SignUp}/>
         <Route exact path="/signin" component={SignIn}/>
         <Route exact path="/welcome" component={Welcome}/>
         <Route exact path="/friends" component={Friends}/>
      </Switch>
    </div>
 )
}
export default AppRoutes;
