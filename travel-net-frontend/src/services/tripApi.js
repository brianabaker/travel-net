
class TripApi {

  static endTrip(currentUser, trip){
    return fetch(`/trips/${trip.id}/endtrip/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser
      })
    })
    .then(res => res.json())
  }

  static addToTrip(tripId, res){
    return fetch(`/trips/${tripId}/add`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        location: res
      })
    })
    .then(res => res.json())
  }

  static createTrip(currentUser, tripName, res) {
    return fetch('/trips', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser,
        tripName: tripName,
        location: res
      })
    })
    .then(res => res.json())
  }


  static fetchTrip(tripId){
    return fetch(`/trips/${tripId}`)
    .then(res => res.json())
  }

  static fetchLocations(tripId) {
    return fetch(`/trips/${tripId}/locations`)
    .then(res => res.json())
  }

  static fetchPhotos(tripId) {
    return fetch(`/trips/${tripId}/photos`)
    .then(res => res.json())
  }

  static addPhotos(tripId, photos) {
      return fetch(`/trips/${tripId}/photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          photoUrl: photos
        })
      })
    .then(res => res.json())
  }


  static editTripLocation(tripLocationId, lat, lng) {
    return fetch(`/triplocations/${tripLocationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lat: lat,
        lng: lng
      })
    })
    .then(res => res.json())
  }


}

export default TripApi
