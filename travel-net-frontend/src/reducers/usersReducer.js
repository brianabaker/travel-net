//ROOT REDUCER

import { CREATING_USER, CREATED_USER, FINDING_USER, FOUND_USER, SELECTED_USER, REQUEST_FRIENDSHIP, REQUESTED_FRIENDSHIP, VIEW_FRIEND_REQUESTS, RECEIVED_FRIEND_REQUESTS, POSTIVE_RESPONSE_FRIEND_REQUEST, COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST, RETURN_TO_FRIENDS_MENU, FETCHING_FRIENDS, FETCHED_FRIENDS, FETCHING_PROFILE, FETCHED_PROFILE, ERRORS } from '../actions/users'


export const usersState = {
  currentUser: '',
  friendRequests: '',
  isLoading: false,
  alert: '',
  friends: ''
}

// loader on 45:00

function usersReducer(state = usersState, action) {
  switch(action.type){
    case CREATING_USER:
      return {...state, isLoading: true, alert: ''}
    case CREATED_USER:
    console.log(action.payload)
      return {...state, isLoading: false, currentUser: action.payload, alert: ''}
    case FINDING_USER:
      return {...state, isLoading: true, alert: ''}
    case FOUND_USER:
      return {...state, isLoading: false, currentUser: action.payload, alert: ''}
    case SELECTED_USER:
      return {...state, selectedUser: action.payload, alert: ''}
    case REQUEST_FRIENDSHIP:
      return {...state, alert: ''}
    case REQUESTED_FRIENDSHIP:
      return {...state, selectedUser: '', alert: action.payload}
    case VIEW_FRIEND_REQUESTS:
      return {...state, alert: ''}
    case RECEIVED_FRIEND_REQUESTS:
      return {...state, friendRequests: action.payload, alert: ''}
    case POSTIVE_RESPONSE_FRIEND_REQUEST:
      return {...state, alert: ''}
    case COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST:
      return {...state, alert: "Added Friend"}
    case RETURN_TO_FRIENDS_MENU:
      return {...state, friendRequests: "", alert: ''}
    case FETCHING_FRIENDS:
    console.log('in the fetching friends')
      return {...state, isLoading: true, alert: ''}
    case FETCHED_FRIENDS:
    console.log('in the fetched friends')
      return {...state, isLoading: false, friends: action.payload, alert: ''}
    case FETCHING_PROFILE:
      return {...state, isLoading: true, alert: ''}
    case FETCHED_PROFILE:
      return {...state, isLoading: false, selectedUser: action.payload, alert: ''}
    case ERRORS:
      return {...state, alert: action.payload}
    default:
      return state;
    }
}

export default usersReducer;


// minute 12:14 how to set this up but i want to see the combined
// connect on 17:30
