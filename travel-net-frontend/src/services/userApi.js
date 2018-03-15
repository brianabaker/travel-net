
// USER API

class UserApi {

  static createUser(username, lat, lng) {
    console.log(username, lat, lng)
    return fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        lat: lat,
        lng: lng
      })
    })
    .then(res => res.json())
  }

  static findUser(username) {
    console.log(username)
    return fetch('http://localhost:3000/users/find', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    })
    .then(res => res.json())
  }

}

export default UserApi
