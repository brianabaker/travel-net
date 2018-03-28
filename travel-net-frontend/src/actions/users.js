
// USER ACTIONS

import UserApi from '../services/userApi'

import { push } from 'react-router-redux'

// export const MAKE_USER = "MAKE_USER"
export const FINDING_USER = "FIND_USER"
export const FOUND_USER = "FOUND_USER"
export const CREATING_USER = "CREATING_USER"
export const CREATED_USER = "CREATED_USER"
// export const SEARCHING_USERS = "SEARCHING_USERS"
// export const SEARCHED_USERS = "SEARCHED_USERS"
export const SELECTED_USER = "SELECTED_USER"
export const REQUEST_FRIENDSHIP = "REQUEST_FRIENDSHIP"
export const REQUESTED_FRIENDSHIP = "REQUESTED_FRIENDSHIP"
export const VIEW_FRIEND_REQUESTS = "VIEW_FRIEND_REQUESTS"
export const RECEIVED_FRIEND_REQUESTS = "RECEIVED_FRIEND_REQUESTS"
export const POSTIVE_RESPONSE_FRIEND_REQUEST = "POSTIVE_RESPONSE_FRIEND_REQUEST"
export const COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST = "COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST"
export const FETCHING_FRIENDS = "FETCHING_FRIENDS"
export const FETCHED_FRIENDS = "FETCHED_FRIENDS"
export const FETCHING_PROFILE = "FETCHING_PROFILE"
export const FETCHED_PROFILE = "FETCHED_PROFILE"
export const ERRORS = "ERRORS"
export const SIGN_OUT = "SIGN_OUT"
export const EDITING_USER = "EDITING_USER"
export const EDITED_USER = "EDITED_USER"
export const SHOW_FRIEND_ON_MAP = "SHOW_FRIEND_ON_MAP"
export const RENDER_SIGN_UP_PAGE = "RENDER_SIGN_UP_PAGE"
export const FETCHED_PAST_TRIPS = "FETCHED_PAST_TRIPS"

// ASK ABOUT THIS ONE
export const RETURN_TO_FRIENDS_MENU = "RETURN_TO_FRIENDS_MENU"

// THESE DO NOT NEED THUNK BUT I NEED TO USE DISPATCH
export function returnToFriendsMenu() {
  return function(dispatch){
    dispatch({type: "RETURN_TO_FRIENDS_MENU"})
    dispatch(push('/friends'))
  }
}

export function renderSignUpPage() {
  return function(dispatch){
    dispatch({type: "RENDER_SIGN_UP_PAGE"})
    dispatch(push('/signup'))
  }
}

export function selectUser(id) {
  return function(dispatch){
    // dispatch({type: "SELECTED_USER", payload: user})
    dispatch(push(`/users/${id}`))
  }
}

// export const showFriendOnMap = (lat, lng) => ({
//   type: "SHOW_FRIEND_ON_MAP",
//   payload: {lat, lng}
// })

export function showFriendOnMap(lat, lng) {
  return function(dispatch){
    dispatch({type: "SHOW_FRIEND_ON_MAP", payload: {lat, lng} })
    // dispatch(push(`/friends/${lat, lng}`))
    dispatch(push(({
      pathname: '/friends',
      search: `?query=${lat,lng}`,
      state: { detail: {lat, lng} }
    })))
  }
}

// THESE ARE ALL FETCHES AND NEED THUNK

export function fetchProfile(currentUser, id){
  return function(dispatch){
    dispatch({type: "FETCHING_PROFILE"})
    UserApi.fetchProfile(currentUser, id).then(profileJSON => {
      dispatch({type: "FETCHED_PROFILE", payload: profileJSON})
    })
  }
}

export function fetchFriends(currentUser) {
  console.log('in fetch friends', currentUser)
  return function(dispatch){
    dispatch({type: "FETCHING_FRIENDS"})
    UserApi.fetchFriends(currentUser).then(friendsJSON => {
      console.log(friendsJSON)
      dispatch({type: "FETCHED_FRIENDS", payload: friendsJSON.friends})
      dispatch({type: "FETCHED_PAST_TRIPS", payload: friendsJSON.past_trips})
    })
  }
}

export function positiveResponseFriendRequest(user, friend){
  return function(dispatch){
    dispatch({type: "POSTIVE_RESPONSE_FRIEND_REQUEST"})
    UserApi.positiveResponseFriendRequest(user, friend).then(friendsJSON => {
    dispatch({type: "COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST"})
    })
  }
}

export function createUser(username, password, passwordConfirmation, location) {
  return function(dispatch){
     dispatch({type: "CREATING_USER"})
     UserApi.createUser(username, password, passwordConfirmation, location)
     .then(userJSON => {
       if (userJSON.errors) {
         dispatch({type: "ERRORS", payload: userJSON.errors})
       } else {
         console.log('createuser', userJSON)
         localStorage.setItem("token", userJSON.auth_token)
         dispatch({type: "CREATED_USER", payload: userJSON.user})
       }
     })
       .then(dispatch(push('/addbio')))
     }
   }

export function editUser(currentUser, username, bio, photoUrl){
  return function(dispatch){
    dispatch({type: "EDITING_USER"})
    UserApi.editProfile(currentUser, username, bio, photoUrl).then(userJSON => {
      console.log('edit user', currentUser, username, bio, photoUrl)
      if (userJSON.error){
        dispatch({type: "ERRORS", payload: userJSON.error})
      } else {
        dispatch({type: "EDITED_USER", payload: userJSON})
        dispatch(push(`/users/${currentUser.id}`))
      }
    })
  }
}

export function addBio(currentUser, bio, photoUrl) {
  return function(dispatch){
    dispatch({type: "EDITING_USER"})
    UserApi.addBio(currentUser, bio, photoUrl).then(userJSON => {
      if (userJSON.error){
        dispatch({type: "ERRORS", payload: userJSON.error})
      } else {
        dispatch({type: "EDITED_USER", payload: userJSON})
      }
    })
    .then(dispatch(push(`/welcome`)))
  }
}

export function login(username, password) {
  return function(dispatch){
    dispatch({type: "FINDING_USER"})
    UserApi.login(username, password).then(userJSON => {
      console.log(userJSON.errors)
      if (userJSON.errors) {
        dispatch({type: "ERRORS", payload: userJSON.errors})
      } else {
        localStorage.setItem("token", userJSON.auth_token);
        dispatch({type: "FOUND_USER", payload: userJSON.user})
        dispatch(push('/welcome'))
      }
    })
  }
}

// export function searchUsers(username) {
//   console.log('in the search user', username)
//   return function(dispatch){
//     dispatch({type: "SEARCHING_USERS"})
//     UserApi.searchUsers(username).then(usersJSON => {
//       dispatch({type: "SEARCHED_USERS", payload: usersJSON})
//     })
//   }
// }

export function requestFriendship(currentUserId, addFriend) {
  return function(dispatch){
    dispatch({type: "REQUEST_FRIENDSHIP"})
    UserApi.requestFriendship(currentUserId, addFriend).then(responseJSON => {
      console.log('dispatch', responseJSON)
      dispatch({type: "REQUESTED_FRIENDSHIP", payload: responseJSON.message})
    })
  }
}

export function viewFriendRequests(currentUser) {
  return function(dispatch){
    dispatch({type: "VIEW_FRIEND_REQUESTS"})
    UserApi.viewFriendRequests(currentUser).then(responseJSON => {
      dispatch({type: "RECEIVED_FRIEND_REQUESTS", payload: responseJSON})
    })
  }
}

export function signOut() {
  return function(dispatch){
    dispatch({type: "SIGN_OUT"})
    UserApi.signOut()
    dispatch(push('/'))
  }
}
