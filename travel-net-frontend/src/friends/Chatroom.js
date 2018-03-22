import React from 'react'
import { ActionCable } from 'react-actioncable-provider';

import {connect} from 'react-redux'

class Chatroom extends React.Component {

	state = {
		content: ""
	}

	sendMesssage = (event) => {
		console.log(this.props.chatroom)
		fetch(`http://localhost:3000/chatrooms/${this.props.chatroom.id}/add_message`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				content: this.state.content,
				user_id: this.props.currentUser.id
			})
		})
		.then(res => {
			this.setState({
				content: "",
			})
		})
	}

	handleChange = (event) => {
		this.setState({
			content: event.target.value
		})
	}

	handleSocketResponse = data => {

    switch (data.type) {
      case 'ADD_MESSAGE':
       		this.props.addMessage(data.payload)
       		break;
      case "DELETE_MESSAGE":
      		this.props.removeMessage(data.payload.message_id)
       		break;
      default:
        console.log(data);
    }
  };


  deleteMessage = (messageId) => {
  	fetch("http://localhost:3000/chatrooms/delete_message", {
  		method: "POST",
  		headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				message_id: messageId,
				chatroom_id: this.props.chatroom.id
			})
  	})
  }

	render(){
    // console.log(this.props.chatroom.messages)
    let messageComponents = ''
    {this.props.chatroom.messages ?
      (messageComponents = this.props.chatroom.messages.map(message => {
        return(
          <p key={message.id}>
            {message.content}
          </p>

        )
      }))
      : null}
		return (
			<div>
				<ActionCable
          channel={{ channel: 'ChatroomChannel', chatroom_id: this.props.chatroom.id }}
          onReceived={this.handleSocketResponse}
        />
				<textarea onChange={this.handleChange} value={this.state.content}/>
				<button onClick={this.sendMesssage} >Enter</button>
				<p>Past Messages:</p>
				{messageComponents}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps)(Chatroom)
