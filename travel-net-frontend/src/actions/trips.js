import TripApi from "../services/tripApi";
import { push } from 'react-router-redux'
import UserApi from '../services/userApi'

export const CREATING_TRIP = "CREATING_TRIP";
export const CREATED_TRIP = "CREATED_TRIP";
export const RENDER_FORM = "RENDER_FORM";
export const CANCEL_CREATE_TRIP = "CANCEL_CREATE_TRIP";
export const FETCHING_TRIP = "FETCHING_TRIP";
export const FETCHED_TRIP = "FETCHED_TRIP";
export const ADDING_TO_TRIP = "ADDING_TO_TRIP";
export const FETCHED_LOCATIONS = "FETCHED_LOCATIONS";
export const EDITING_TRIP_LOCATION = "EDITING_TRIP_LOCATION";
export const EDITED_TRIP_LOCATION = "EDITED_TRIP_LOCATION";
export const ENDING_TRIP = "ENDING_TRIP"
export const ENDED_TRIP = "ENDED_TRIP"
export const FETCHED_PHOTOS = "FETCHED_PHOTOS"

export function endTrip(currentUser, currentTrip) {
  return function(dispatch) {
    dispatch({type: "ENDING_TRIP"})
    TripApi.endTrip(currentUser, currentTrip).then(tripJSON => {
      (dispatch({type: "ENDED_TRIP", payload: tripJSON}))
    }).then(dispatch(push(`/wherelive`)))
    UserApi.fetchFriends(currentUser).then(friendsJSON => {
        dispatch({type: "FETCHED_FRIENDS", payload: friendsJSON.friends})
        dispatch({type: "FETCHED_PAST_TRIPS", payload: friendsJSON.past_trips})
      })
  }
}

export function createTrip(currentUser, tripName, lat, lng) {
  return function(dispatch) {
    dispatch({ type: "CREATING TRIP" });
    TripApi.createTrip(currentUser, tripName, lat, lng).then(tripJSON => {
      dispatch({ type: "CREATED_TRIP", payload: tripJSON.trip });
      dispatch({ type: "FOUND_USER", payload: tripJSON.user });
      TripApi.fetchLocations(tripJSON.trip.id).then(locationsJSON => {
        dispatch({ type: "FETCHED_LOCATIONS", payload: locationsJSON });
      });
    });
  };
}

export function addToTrip(tripId, lat, lng) {
  return function(dispatch) {
    dispatch({ type: "ADDING_TO_TRIP" });
    TripApi.addToTrip(tripId, lat, lng).then(tripJSON => {
      dispatch({ type: "FETCHED_TRIP", payload: tripJSON });
      TripApi.fetchLocations(tripId).then(locationsJSON => {
        dispatch({ type: "FETCHED_LOCATIONS", payload: locationsJSON });
      });
    });
  };
}

export function fetchTrip(tripId) {
  return function(dispatch) {
    dispatch({ type: "FETCHING_TRIP" });
    TripApi.fetchTrip(tripId).then(tripJSON => {
      dispatch({ type: "FETCHED_TRIP", payload: tripJSON });
      TripApi.fetchLocations(tripId).then(locationsJSON => {
        dispatch({ type: "FETCHED_LOCATIONS", payload: locationsJSON });
        TripApi.fetchPhotos(tripId).then(photosJSON => {
          dispatch({ type: "FETCHED_PHOTOS", payload: photosJSON});
        })
      });
    });
  };
}

export function editTripLocation(tripLocationId, lat, lng, tripId) {
  return function(dispatch) {
    dispatch({ type: "EDITING_TRIP_LOCATION" });
    TripApi.editTripLocation(tripLocationId, lat, lng).then(editedTripLocation => {
      dispatch({type: "EDITED_TRIP_LOCATION"})
      TripApi.fetchLocations(tripId).then(locationsJSON => {
        dispatch({ type: "FETCHED_LOCATIONS", payload: locationsJSON });
      });
    });
  };
}

export function renderForm() {
  return {
    type: "RENDER_FORM",
    action: true
  };
}

export function cancelCreateTrip() {
  return {
    type: "CANCEL_CREATE_TRIP",
    action: false
  };
}
