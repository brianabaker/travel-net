
class TripApi {

  static endTrip(currentUser, trip){
    console.log(currentUser, trip)
    console.log('in the api')
    return fetch(`http://localhost:3000/trips/${trip.id}/endtrip/`, {
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
    return fetch(`http://localhost:3000/trips/${tripId}/add`, {
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
    return fetch('http://localhost:3000/trips', {
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
    return fetch(`http://localhost:3000/trips/${tripId}`)
    .then(res => res.json())
  }

  static fetchLocations(tripId) {
    return fetch(`http://localhost:3000/trips/${tripId}/locations`)
    .then(res => res.json())
  }

  static fetchPhotos(tripId) {
    ('hit the fetch photos', tripId)
    return fetch(`http://localhost:3000/trips/${tripId}/photos`)
    .then(res => res.json())
  }

  static addPhotos(tripId, photos) {
    console.log('hit the api', tripId, photos)
    // photos.filesUploaded.map(newPhoto => {
      return fetch(`http://localhost:3000/trips/${tripId}/photos`, {
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
    return fetch(`http://localhost:3000/triplocations/${tripLocationId}`, {
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
