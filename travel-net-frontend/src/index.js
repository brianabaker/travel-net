// style
import './index.css';
import 'semantic-ui-css/semantic.min.css'

// devtools
import { composeWithDevTools } from 'redux-devtools-extension'

//thunk
import thunk from "redux-thunk"

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux"

//react-redux
import AppRoutes from "./appRoutes";

// reducers
import usersReducer from "./reducers/usersReducer"
import tripsReducer from './reducers/tripsReducer'

//websockets
import {ActionCableProvider} from 'react-actioncable-provider'

// local localStorage
import {loadState, saveState} from './localStorage'

// app routes
import { Route, Switch} from "react-router-dom";
import App from "./App";
import NavBar from './NavBar'
import SignUp from './users/SignUp'
import SignIn from './users/SignIn'

// react-router-redux
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const router = routerMiddleware(history)

const reducers= combineReducers({users: usersReducer, trips: tripsReducer, router: routerReducer});

const persistedState = loadState()

const store = createStore(reducers, persistedState, composeWithDevTools(applyMiddleware(thunk, router)));

store.subscribe(() => {
  saveState(store.getState())
})

const API_WS_ROOT = `ws://localhost:3000/cable`

ReactDOM.render(
 <Provider store={store}>
   <ActionCableProvider url={API_WS_ROOT}>
     <ConnectedRouter history={history}>
        <React.Fragment>
          <NavBar/>
          <Switch>
            <Route exact path='/' component={App}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/signin" component={SignIn}/>
            <AppRoutes />
          </Switch>
       </React.Fragment>
     </ConnectedRouter>
   </ActionCableProvider>
 </Provider>,
 document.getElementById('root')
)
