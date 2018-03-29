
import {RENDER_FORM, CANCEL_CREATE_TRIP, CREATING_TRIP, CREATED_TRIP, FETCHING_TRIP, FETCHED_TRIP, FETCHED_LOCATIONS, ADDING_TO_TRIP, EDITING_TRIP_LOCATION, EDITED_TRIP_LOCATION, ENDING_TRIP, ENDED_TRIP, POSTING_PHOTOS, FETCHED_PHOTOS} from '../actions/trips'

export const tripsState = {
  renderForm: false,
  tripLocations: '',
  currentTrip: '',
  isLoading: false,
  tripPhotos: ''
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
      return {...state, isLoading: true, currentTrip: action.payload}
    case FETCHED_LOCATIONS:
      return {...state, isLoading: false, tripLocations: action.payload}
    case POSTING_PHOTOS:
      return {...state, isLoading: true}
    case FETCHED_PHOTOS:
    console.log('IN THE REDUCER', action.payload)
      return {...state, isLoading: false, tripPhotos: action.payload}
    case ADDING_TO_TRIP:
     return {...state, isLoading: true}
    case EDITING_TRIP_LOCATION:
      return {...state, isLoading: true}
    case EDITED_TRIP_LOCATION:
      return {...state, isLoading: false}
    case ENDING_TRIP:
      return {...state, isLoading: true}
    case ENDED_TRIP:
      return {...state, isLoading: false, currentUser: action.payload.user, tripLocations: '', currentTrip: ''}
    case "SIGN_OUT":
      return {state: tripsState }
    default:
      return state;
  }
}

export default tripsReducer
