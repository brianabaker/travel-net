
import {RENDER_FORM, CANCEL_CREATE_TRIP, CREATING_TRIP, CREATED_TRIP, FETCHING_TRIP, FETCHED_TRIP, FETCHED_LOCATIONS, ADDING_TO_TRIP, EDITING_TRIP_LOCATION, EDITED_TRIP_LOCATION, ENDING_TRIP, ENDED_TRIP} from '../actions/trips'

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
      return {...state, isLoading: false, currentTrip: action.payload, renderForm: false}
    case FETCHING_TRIP:
      return {...state, isLoading: true, tripLocations: ''}
    case FETCHED_TRIP:
    console.log('fetched trip')
      return {...state, isLoading: true, currentTrip: action.payload}
    case FETCHED_LOCATIONS:
    console.log('fetched locations')
      return {...state, isLoading: false, tripLocations: action.payload}
    case ADDING_TO_TRIP:
     return {...state, isLoading: true}
    case EDITING_TRIP_LOCATION:
    console.log('hitting trip reducer')
      return {...state, isLoading: true}
    case EDITED_TRIP_LOCATION:
    console.log('in the edited')
      return {...state, isLoading: false}
    case ENDING_TRIP:
      return {...state, isLoading: true}
    case ENDED_TRIP:
      return {...state, isLoading: false, tripLocations: '', currentTrip: ''}
    default:
      return state;
  }
}

export default tripsReducer
