
// USER ACTIONS

import UserApi from '../services/userApi'

import { push } from 'react-router-redux'

// export const MAKE_USER = "MAKE_USER"
export const FINDING_USER = "FIND_USER"
export const FOUND_USER = "FIND_USER"
export const CREATING_USER = "CREATING_USER"
export const CREATED_USER = "CREATED_USER"


// funk importing starts 40 mins
// funk has a simple rule mins 42
// any action must return a function that takes dispatch

// thunk grabs dispatch

export function createUser(username, lat, lng) {
  return function(dispatch){
     dispatch({type: "CREATING_USER"})
     UserApi.createUser(username, lat, lng).then(userJSON => {
       dispatch({type: "CREATED_USER", payload: userJSON})
     })
  }
}

export function findUser(username) {
  return function(dispatch){
    dispatch({type: "FINDING_USER"})
    UserApi.findUser(username).then(userJSON => {
      dispatch({type: "FOUND_USER", payload: userJSON})
    })
  }
}
