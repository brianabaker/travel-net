// USER API

class UserApi {
  static createUser(username, password, passwordConfirmation, location) {
    console.log('in the create user')
    return fetch("http://localhost:3000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
        lat: location.lat,
        lng: location.lng
      })
    }).then(res => res.json());
  }

  static login(username, password) {
    console.log(username, password)
    return fetch("http://localhost:3000/auth_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json())
  }

  static searchUsers(username) {
    console.log('in the search api', username)
    return fetch("http://localhost:3000/users/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: username
      })
    }).then(res => res.json());
  }

  static requestFriendship(currentUser, user) {
    console.log('in the requqest friend', currentUser, user)
    return fetch("http://localhost:3000/users/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser,
        requestFriend: user
      })
    }).then(res => res.json())

  }

  static viewFriendRequests(currentUser) {
    return fetch("http://localhost:3000/users/viewrequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser
      })
    }).then(res => res.json())
    // .then(json => console.log(json))
  }

  static positiveResponseFriendRequest(currentUser, friend) {
    console.log("api add friend");
    return fetch("http://localhost:3000/users/addfriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser,
        friend: friend
      })
    }).then(res => res.json());
  }

  static fetchFriends(currentUser) {
    console.log('in the api', currentUser.id)
    return fetch(`http://localhost:3000/users/${currentUser.id}/friends`)
    .then(res => res.json())
  }
  //
  //   static fetchProfile(currentUser, id){
  //     return fetch(`http://localhost:3000/users/${id}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         currentUser: currentUser
  //       })
  //     })
  //     .then(res => res.json())
  //   }

  static signOut(){
    localStorage.removeItem("state");
    localStorage.removeItem("token");
  }
}

export default UserApi;
