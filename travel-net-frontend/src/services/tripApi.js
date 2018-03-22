
class TripApi {

  static addToTrip(tripId, res){
    return fetch(`http://localhost:3000/trips/${tripId}`, {
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

  // static fetchTrip(currentUser){
  //   return fetch('http://localhost:3000/trips/findtrip', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       currentUser: currentUser
  //     })
  //   })
  //   .then(res => res.json())
  // }

  static fetchLocations(tripId) {
    return fetch(`http://localhost:3000/trips/${tripId}/locations`)
    .then(res => res.json())
  }

  static editTrip(tripId, locationId, res) {
    return fetch(`http://localhost:3000/trips/${tripId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        locationId: locationId,
        location: res
      })
    })
  }


}

export default TripApi
