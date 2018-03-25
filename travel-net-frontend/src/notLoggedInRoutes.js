import React from 'react';
import { Route, Switch} from "react-router-dom";

import SignUp from './users/SignUp'
import SignIn from './users/SignIn'
import Splash from './containers/Splash'
import AppRoutes from "./appRoutes";

const NotLoggedInRoutes = (props) => {
  return(
    <React.Fragment>
      <Switch>
          <Route exact path='/' component={Splash}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <AppRoutes />
      </Switch>
    </React.Fragment>
  )
}

export default NotLoggedInRoutes
