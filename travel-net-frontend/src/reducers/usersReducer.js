//ROOT REDUCER

import { CREATING_USER, CREATED_USER, FINDING_USER, FOUND_USER, SELECTED_USER, REQUEST_FRIENDSHIP, REQUESTED_FRIENDSHIP, VIEW_FRIEND_REQUESTS, RECEIVED_FRIEND_REQUESTS, POSTIVE_RESPONSE_FRIEND_REQUEST, COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST, RETURN_TO_FRIENDS_MENU, FETCHING_FRIENDS, FETCHED_FRIENDS, FETCHING_PROFILE, FETCHED_PROFILE, ERRORS, SIGN_OUT, EDITING_USER, EDITED_USER, SHOW_FRIEND_ON_MAP, RENDER_SIGN_UP_PAGE, FETCHED_PAST_TRIPS, CHANGE_USER_LOCATION } from '../actions/users'


export const usersState = {
  currentUser: '',
  friendRequests: '',
  isLoading: false,
  alert: '',
  friends: '',
  showFriendOnMap: '',
  pastTrips: ''
}

// loader on 45:00

function usersReducer(state = usersState, action) {
  switch(action.type){
    case CREATING_USER:
      return {...state, isLoading: true, alert: ''}
    case CREATED_USER:
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
          console.log('hit completed friend request')
      return {...state, selectedUser: '', alert: action.payload}
    case VIEW_FRIEND_REQUESTS:
      return {...state, alert: ''}
    case RECEIVED_FRIEND_REQUESTS:
      return {...state, friendRequests: action.payload, alert: ''}
    case POSTIVE_RESPONSE_FRIEND_REQUEST:
      return {...state, alert: ""}
    case COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST:
      return {...state, alert: "Added Friend"}
    case RETURN_TO_FRIENDS_MENU:
      return {...state, friendRequests: "", alert: ''}
    case FETCHING_FRIENDS:
      return {...state, isLoading: true, alert: ''}
    case FETCHED_FRIENDS:
      return {...state, isLoading: false, friends: action.payload, alert: ''}
    case FETCHING_PROFILE:
      return {...state, isLoading: true, alert: ''}
    case FETCHED_PROFILE:
      return {...state, isLoading: false, selectedUser: action.payload, alert: ''}
    case EDITING_USER:
      return {...state, isLoading: true}
    case EDITED_USER:
      return {...state, isLoading: false, currentUser: action.payload}
    case ERRORS:
      return {...state, alert: action.payload}
    case SIGN_OUT:
      return {state: usersState}
    case SHOW_FRIEND_ON_MAP:
      return {...state, showFriendOnMap: action.payload}
    case RENDER_SIGN_UP_PAGE:
      return {... state}
    case "ENDED_TRIP":
      return {... state, currentUser: action.payload.user}
    case FETCHED_PAST_TRIPS:
      return {...state, pastTrips: action.payload}
    case CHANGE_USER_LOCATION:
      return {...state}
    default:
      return state;
    }
}

export default usersReducer;


// minute 12:14 how to set this up but i want to see the combined
// connect on 17:30
