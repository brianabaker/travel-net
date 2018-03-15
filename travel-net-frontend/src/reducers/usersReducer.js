//ROOT REDUCER

import { CREATING_USER, CREATED_USER, FINDING_USER, FOUND_USER } from '../actions/users'

const defaultState = {
  currentUser: {id: 6, username: "Mimi", bio: null, lat: "25.76168", lng: "-80.19179"},
  redirectToNewPage: false,
  isLoading: false
}

// loader on 45:00

function rootReducer(state = defaultState, action) {
  switch(action.type){
    case CREATING_USER:
      return {...state, isLoading: true}
    case CREATED_USER:
      return {...state, isLoading: false, currentUser: action.payload}
    case FINDING_USER:
      return {...state, isLoading: true}
    case FOUND_USER:
      return {... state, isLoading: false, currentUser: action.payload}
    default:
      return state;
    }
}

export default rootReducer;


// minute 12:14 how to set this up but i want to see the combined
// connect on 17:30
