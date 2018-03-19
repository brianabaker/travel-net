
import {CREATING_TRIP, CREATED_TRIP} from '../actions/trips'

import defaultState from './usersReducer'

function tripsReducer(state = defaultState, action) {
  switch(action.type){
    case CREATING_TRIP:
    console.log(state)
    console.log('creating trip')
      return {...state, isLoading: true}
    case CREATED_TRIP:
      return {...state, isLoading: false}
    default:
      return state;
  }
}

export default tripsReducer
