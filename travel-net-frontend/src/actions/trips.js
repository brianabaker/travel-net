import TripApi from "../services/tripApi";
// import { push } from 'react-router-redux'

export const CREATING_TRIP = "CREATING_TRIP";
export const CREATED_TRIP = "CREATED_TRIP";
export const RENDER_FORM = "RENDER_FORM";
export const CANCEL_CREATE_TRIP = "CANCEL_CREATE_TRIP";
export const FETCHING_TRIP = "FETCHING_TRIP";
export const FETCHED_TRIP = "FETCHED_TRIP";
export const ADDING_TO_TRIP = "ADDING_TO_TRIP";
export const FETCHED_LOCATIONS = "FETCHED_LOCATIONS";

export function createTrip(currentUser, tripName, lat, lng) {
  return function(dispatch) {
    dispatch({ type: "CREATING TRIP" });
    TripApi.createTrip(currentUser, tripName, lat, lng).then(tripJSON => {
      dispatch({ type: "CREATED_TRIP", payload: tripJSON.trip });
      console.log(tripJSON.user);
      dispatch({ type: "FOUND_USER", payload: tripJSON.user });
      TripApi.fetchLocations(tripJSON.id).then(locationsJSON => {
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
