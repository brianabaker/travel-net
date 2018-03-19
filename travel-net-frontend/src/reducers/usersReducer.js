//ROOT REDUCER

import { CREATING_USER, CREATED_USER, FINDING_USER, FOUND_USER, SEARCHING_USERS, SEARCHED_USERS, SELECTED_USER, REQUEST_FRIENDSHIP, REQUESTED_FRIENDSHIP, VIEW_FRIEND_REQUESTS, RECEIVED_FRIEND_REQUESTS, POSTIVE_RESPONSE_FRIEND_REQUEST, COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST, RETURN_TO_FRIENDS_MENU, FETCHING_FRIENDS, FETCHED_FRIENDS, FETCHING_PROFILE, FETCHED_PROFILE } from '../actions/users'


// {id: 6, username: "Mimi", bio: null, lat: "25.76168", lng: "-80.19179"}

export const defaultState = {
  currentUser: {id: 7, username: "Richie", bio: null, lat: "-34.603684", lng: "-58.381559"},
  friendRequests: '',
  searchedUsers: '',
  isLoading: false,
  alert: '',
  friends: '',
  selectedUser: ''
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
      return {...state, isLoading: false, currentUser: action.payload}
    case SEARCHING_USERS:
      return {...state, isLoading: true, searchedUsers: ''}
    case SEARCHED_USERS:
      return {...state, isLoading: false, searchedUsers: action.payload}
    case SELECTED_USER:
      return {...state, selectedUser: action.payload}
    case REQUEST_FRIENDSHIP:
      return {...state}
    case REQUESTED_FRIENDSHIP:
      return {...state, selectedUser: '', alert: action.payload}
    case VIEW_FRIEND_REQUESTS:
      return {...state}
    case RECEIVED_FRIEND_REQUESTS:
      return {...state, friendRequests: action.payload}
    case POSTIVE_RESPONSE_FRIEND_REQUEST:
    console.log('in the reducer')
      return {...state}
    case COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST:
      return {...state, alert: "Added Friend"}
    case RETURN_TO_FRIENDS_MENU:
      return {...state, friendRequests: ""}
    case FETCHING_FRIENDS:
      return {...state, isLoading: true}
    case FETCHED_FRIENDS:
      return {...state, isLoading: false, friends: action.payload}
    case FETCHING_PROFILE:
      return {...state, isLoading: true}
    case FETCHED_PROFILE:
      return {...state, isLoading: false, selectedUser: action.payload}
    default:
      return state;
    }
}

export default rootReducer;


// minute 12:14 how to set this up but i want to see the combined
// connect on 17:30
