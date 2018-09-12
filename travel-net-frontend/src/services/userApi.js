// USER API

class UserApi {

  static fetchCurrentUser() {
    return fetch('/active_user', {
      method: 'POST',
      headers: {
        'authorization': localStorage.getItem('token')
        }
    }).then(res => res.json())
  }

  static createUser(username, password, passwordConfirmation, location) {
    return fetch("/users/", {
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
    return fetch("/auth_user", {
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
    return fetch("/users/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUserId: id,
        query: username
      })
    })
    .then(res => res.json())
  }

  static requestFriendship(currentUser, user) {
    return fetch("/users/request", {
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
    return fetch("/users/viewrequests", {
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
    return fetch("/users/addfriend", {
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
    return fetch(`/users/${currentUser.id}/friends`)
    .then(res => res.json())
  }

  static fetchProfile(currentUser, id) {
    console.log('in fetch profile', currentUser, id)
    return fetch(`/users/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser
      })
    })
    .then(res => res.json())
  }

  static editProfile(currentUser, username, bio, photoUrl){
    return fetch('/users/', {
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

  static editUserLocation(currentUser, lat, lng){
    return fetch(`/users/wherelive`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentUser: currentUser.id,
          lat: lat,
          lng: lng
        })
      })
      .then(res => res.json())
  }

  static addBio(currentUser, bio, photoUrl){
    return fetch('/users/addbio', {
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
