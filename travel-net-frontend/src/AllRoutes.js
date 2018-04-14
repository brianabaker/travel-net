
// react, routing
import React from 'react';
import { Route, Switch} from "react-router-dom";

// components
import SignIn from './users/SignIn'
import Splash from './containers/Splash'
import LoggedInRoutes from "./LoggedInRoutes";
import AddMoreUserInfo from './users/AddMoreUserInfo';
import SignUpContainer from './containers/SignUpContainer'

const AllRoutes = (props) => {
  return(
    <React.Fragment>
      <Switch>
          <Route exact path='/' component={Splash}/>
          <Route exact path="/signup" component={SignUpContainer}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/addbio" component={AddMoreUserInfo}/>
          <LoggedInRoutes />
      </Switch>
    </React.Fragment>
  )
}

export default AllRoutes
