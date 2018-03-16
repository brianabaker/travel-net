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

// react-router-redux
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const router = routerMiddleware(history)

const reducers= combineReducers({users: usersReducer, router: routerReducer});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, router)));

ReactDOM.render(
 <Provider store={store}>
   <ConnectedRouter history={history}>
     <AppRoutes />
   </ConnectedRouter>
 </Provider>,
 document.getElementById('root')
)
