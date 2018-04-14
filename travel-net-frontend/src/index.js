// style
import './index.css';
import 'semantic-ui-css/semantic.min.css'

// devtools
import { composeWithDevTools } from 'redux-devtools-extension'

// react, redux, thunk
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import thunk from "redux-thunk"
import { createStore, combineReducers, applyMiddleware } from "redux"

// reducers
import usersReducer from "./reducers/usersReducer"
import tripsReducer from './reducers/tripsReducer'
import chatsReducer from './reducers/chatsReducer'
import errorsReducer from './reducers/errorsReducer'

//websockets
import {ActionCableProvider} from 'react-actioncable-provider'

// routing
import App from "./App";
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const router = routerMiddleware(history)

const reducers= combineReducers({users: usersReducer, trips: tripsReducer, chats: chatsReducer, router: routerReducer, errors: errorsReducer});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, router)));

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
