// USER API

class UserApi {
  static createUser(username, lat, lng) {
    console.log(username, lat, lng);
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        lat: lat,
        lng: lng
      })
    }).then(res => res.json());
  }

  static findUser(username) {
    return fetch("http://localhost:3000/users/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    }).then(res => res.json());
  }

  static searchUsers(username) {
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
    return fetch("http://localhost:3000/users/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser,
        requestFriend: user
      })
    }).then(res => res.json());
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
    }).then(res => res.json());
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

  static fetchProfile(currentUser, id){
    return fetch(`http://localhost:3000/users/${id}`, {
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
}

export default UserApi;
