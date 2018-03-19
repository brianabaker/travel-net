
import TripApi from '../services/tripApi'

export const CREATING_TRIP = "CREATING_TRIP"
export const CREATED_TRIP = "CREATED_TRIP"


export function createTrip(currentUser, tripName, lat, lng) {
  return function(dispatch){
    dispatch({type: "CREATING TRIP"})
    TripApi.createTrip(currentUser, tripName, lat, lng)
  }
}
