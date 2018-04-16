//ROOT REDUCER

import { CREATING_USER, CREATED_USER_SUCCESS, LOGGING_IN_USER, LOGGING_IN_USER_SUCCESS, SELECTED_USER, REQUEST_FRIENDSHIP, REQUESTED_FRIENDSHIP, VIEW_FRIEND_REQUESTS, RECEIVED_FRIEND_REQUESTS, POSTIVE_RESPONSE_FRIEND_REQUEST, COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST, RETURN_TO_FRIENDS_MENU, FETCHING_FRIENDS, FETCHED_FRIENDS, FETCHING_PROFILE, FETCHED_PROFILE, SIGN_OUT, EDITING_USER, EDITED_USER, SHOW_FRIEND_ON_MAP, RENDER_SIGN_UP_PAGE, FETCHED_PAST_TRIPS, CHANGE_USER_LOCATION, SET_USER } from '../actions/users'


export const usersState = {
  currentUser: '',
  friendRequests: '',
  redirect: false,
  isLoading: false,
  alert: '',
  friends: '',
  showFriendOnMap: '',
  pastTrips: '',
  selectedUser: '',
  currentUserPendingFriendsArray: '',
  selectedFriendsWithCurrentUser: ''
}

// loader on 45:00

function usersReducer(state = usersState, action) {
  switch(action.type){
    case CREATING_USER:
      return {...state, isLoading: true, alert: ''}
    case CREATED_USER_SUCCESS:
      console.log('redirect set to true')
      return {...state, redirect: true, isLoading: false, currentUser: action.payload, alert: ''}
    case LOGGING_IN_USER:
      return {...state, isLoading: true, alert: ''}
    case LOGGING_IN_USER_SUCCESS:
      return {...state, isLoading: false, currentUser: action.payload, alert: ''}
    case SET_USER:
      return {...state, currentUser: action.payload}
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
      return {...state, isLoading: false, selectedUser: action.payload.user, currentUserPendingFriendsArray: action.payload.current_user_pending_friends_array, selectedFriendsWithCurrentUser: action.payload.are_friends, alert: ''}
    case EDITING_USER:
      return {...state, isLoading: true}
    case EDITED_USER:
      return {...state, isLoading: false, currentUser: action.payload}
    case SIGN_OUT:
      return {state: usersState}
    case SHOW_FRIEND_ON_MAP:
      return {...state, showFriendOnMap: action.payload}
    case RENDER_SIGN_UP_PAGE:
      return {...state}
    case "ENDED_TRIP":
      return {...state, currentUser: action.payload.user}
    case FETCHED_PAST_TRIPS:
      return {...state, pastTrips: action.payload}
    case CHANGE_USER_LOCATION:
      return {...state}
    default:
      return state;
    }
}

export default usersReducer;
