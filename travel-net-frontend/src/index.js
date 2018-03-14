import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// style
import './index.css';
import 'semantic-ui-css/semantic.min.css'

//react-redux
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// reducers
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer)
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
 , document.getElementById('root'));
