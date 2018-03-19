
import {RENDER_FORM, CANCEL_CREATE_TRIP, CREATING_TRIP, CREATED_TRIP, FETCHING_TRIP, FETCHED_TRIP, FETCHED_LOCATIONS, ADDING_TO_TRIP} from '../actions/trips'

export const tripsState = {
  renderForm: false,
  tripLocations: '',
  currentTrip: '',
  isLoading: false
}

function tripsReducer(state = tripsState, action) {
  switch(action.type){
    case RENDER_FORM:
      return {...state, renderForm: true}
    case CANCEL_CREATE_TRIP:
      return {...state, renderForm: false}
    case CREATING_TRIP:
      return {...state, isLoading: true}
    case CREATED_TRIP:
    console.log('create trip', action.payload)
      return {...state, isLoading: false, currentTrip: action.payload, renderForm: false}
    case FETCHING_TRIP:
      return {...state, isLoading: true}
    case FETCHED_TRIP:
      return {...state, isLoading: false, currentTrip: action.payload}
    case FETCHED_LOCATIONS:
      return {...state, tripLocations: action.payload}
    case ADDING_TO_TRIP:
     return {...state, isLoading: true}
    default:
      return state;
  }
}

export default tripsReducer
