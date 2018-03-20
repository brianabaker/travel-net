import React from 'react'
import Chatroom from './Chatroom'
// import ChatroomList from './ChatroomList'
import {connect} from 'react-redux'
class ChatroomContainer extends React.Component {
state = {
		chatrooms: '',
		openChatroom: null,
		password: ""
	}

	componentDidMount(){
    this.fetchChat(this.props.currentUser, this.props.friend_id)
	}

  fetchChat = (currentUser, friend) => {
    fetch('http://localhost:3000/chatrooms/find', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        currentUser: currentUser,
        friend: friend
      })
    })
    .then(res => res.json())
    .then(chatroom => {
      this.setState({
        chatrooms: chatroom,
        openChatroom: chatroom
      })
    })
  }

	// removeMessage = (messageId) => {
	// 	let newMessages = this.state.openChatroom.messages.filter(message => message.id !== messageId)
  //
	// 	let newChatroom = {...this.state.openChatroom}
  //
	// 	newChatroom.messages = newMessages
  //
	// 	this.setState({
	// 		openChatroom: newChatroom
	// 	})
  //
	// }

	// selectRoom = (chatroomId) => {
	// 	fetch(`http://localhost:3000/chatrooms/${chatroomId}/authorize`, {
	// 		method: "POST",
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Accept': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			password: this.state.password
	// 		})
	// 	})
	// 	.then(res => res.json())
	// 	.then(chatroom => {
	// 		this.setState({
	// 			openChatroom: chatroom
	// 		})
	// 	})
	// }
	// handleChange = (event) => {
	// 	this.setState({
	// 		password: event.target.value
	// 	})
	// }

	// leaveRoom = () => {
	// 	this.setState({
	// 		openChatroom: null
	// 	})
	// }

	addMessage = (message) => {
		let copyChat = {...this.state.openChatroom}
		copyChat.messages.push(message)
		this.setState({
			openChatroom: copyChat
		}, () => console.log(this.state.openChatroom))
	}



	render() {
		return (
			<div>
				{this.state.openChatroom ? <Chatroom removeMessage={this.removeMessage} addMessage={this.addMessage} leaveRoom={this.leaveRoom} chatroom={this.state.openChatroom}/> : "no open chatroom"}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          selectedUser: state.users.selectedUser}
}

export default connect(mapStateToProps)(ChatroomContainer)
