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

  static searchUsers(id, username) {
    console.log('in the search api', id, username)
    return fetch("http://localhost:3000/users/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUserId: id,
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
    return fetch(`http://localhost:3000/users/${currentUser.id}/friends`)
    .then(res => res.json())
  }

  static editProfile(currentUser, username, bio, photoUrl){
    return fetch('http://localhost:3000/users/', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser.id,
        username: username,
        bio: bio,
        photoUrl: photoUrl
      })
    })
    .then(res => res.json())
  }

  static addBio(currentUser, bio, photoUrl){
    return fetch('http://localhost:3000/users/addbio', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentUser: currentUser.id,
          bio: bio,
          photoUrl: photoUrl
        })
      })
      .then(res => res.json())
    }

  static signOut(){
    localStorage.removeItem("state");
    localStorage.removeItem("token");
  }
}

export default UserApi;
