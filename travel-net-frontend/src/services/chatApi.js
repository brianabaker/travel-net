class ChatApi {
  static fetchChat(currentUser, friend) {
    return fetch("/chatrooms/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        currentUser: currentUser,
        friend: friend
      })
    })
    .then(res => res.json())
  }

  static sendMessage(chatroomId, currentUser, content) {
    console.log(content)
    return fetch(`/chatrooms/${chatroomId}/add_message`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				content: content,
				user_id: currentUser
			})
		})
    .then(res => res.json())
  }
}

export default ChatApi;
