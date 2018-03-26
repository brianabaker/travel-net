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
// import AppRoutes from "./appRoutes";

// reducers
import usersReducer from "./reducers/usersReducer"
import tripsReducer from './reducers/tripsReducer'
import chatsReducer from './reducers/chatsReducer'

//websockets
import {ActionCableProvider} from 'react-actioncable-provider'

// local localStorage
import {loadState, saveState} from './localStorage'

// app routes
import App from "./App";
// import { Route, Switch} from "react-router-dom";
// import NavBar from './NavBar'
// import SignUp from './users/SignUp'
// import SignIn from './users/SignIn'

// working on navbar
// import FriendsMenu from './containers/FriendsMenu'
// react-router-redux
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const router = routerMiddleware(history)

const reducers= combineReducers({users: usersReducer, trips: tripsReducer, chats: chatsReducer, router: routerReducer});

// const persistedState = loadState()

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, router)));

// store.subscribe(() => {
//   saveState(store.getState())
// })

const API_WS_ROOT = `ws://localhost:3000/cable`

ReactDOM.render(
 <Provider store={store}>
   <ActionCableProvider url={API_WS_ROOT}>
     <ConnectedRouter history={history}>
       <App/>
     </ConnectedRouter>
   </ActionCableProvider>
 </Provider>,
 document.getElementById('root')
)
