
class TripApi {

  static createTrip(currentUser, tripName, lat, lng) {
    console.log(lat)
    console.log(lng)
    console.log('in the trip api')
    return fetch('http://localhost:3000/trips', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser,
        tripName: tripName,
        location: [lat, lng]
      })
    })
    .then(res => res.json)
    .then(json => console.log(json))
  }

}

export default TripApi
