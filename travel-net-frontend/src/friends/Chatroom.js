import React from 'react'
import { ActionCable } from 'react-actioncable-provider';

import {connect} from 'react-redux'
import {sendMessage} from '../actions/chats'

class Chatroom extends React.Component {

	state = {
		content: ""
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom() {
		this.el.scrollIntoView({ behavior: 'smooth' });
	}


	handleChange = (event) => {
		this.setState({
			content: event.target.value
		}, () => console.log('chatroom change', this.state.content))
	}

	sendMesssage = (e) => {
		e.preventDefault()
		this.props.sendMessage(this.props.chatroom.id, this.props.currentUser.id, this.state.content)
			this.setState({
				content: ""
		})
	}



	handleSocketResponse = data => {
    switch (data.type) {
      case 'ADD_MESSAGE':
       		this.props.addMessage(data.payload)
       		break;
      // case "DELETE_MESSAGE":
      // 		this.props.removeMessage(data.payload.message_id)
      //  		break;
      default:
        console.log(data);
    }
  };


  // deleteMessage = (messageId) => {
  // 	fetch("http://localhost:3000/chatrooms/delete_message", {
  // 		method: "POST",
  // 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Accept': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			message_id: messageId,
	// 			chatroom_id: this.props.chatroom.id
	// 		})
  // 	})
  // }

	render(){
    let messageComponents = ''
    {this.props.chatroom.messages ?
      (messageComponents = this.props.chatroom.messages.map(message => {
				// console.log('trial', message.user_id)
				// console.log(this.props.currentUser.id)
				let bubbleStyle = message.user_id === this.props.currentUser.id ? "chat-me" : "chat-them"
        return(
					<React.Fragment>
          	<p key={message.id} className={bubbleStyle}>
            	{message.content}
          	</p>
						<div ref={el => { this.el = el; }} />
					</React.Fragment>
        )
      }))
      : null}
		return (
			<div>
				<ActionCable
					channel={{ channel: 'ChatroomChannel', chatroom_id: this.props.chatroom.id }}
					onReceived={this.handleSocketResponse}
				/>
				{messageComponents}
				<div className="ui fluid action input chat-input">
					<input type="text" onChange={this.handleChange} value={this.state.content}/>
					<button className="ui button" onClick={this.sendMesssage} >Enter</button>
				</div>
			</div>
		)
	}
}
//
// <ActionCable
// 	channel={{ channel: 'ChatroomChannel', chatroom_id: this.props.chatroom.id }}
// 	onReceived={this.handleSocketResponse}
// />
// <textarea onChange={this.handleChange} value={this.state.content}/>
// <button onClick={this.sendMesssage} >Enter</button>
// <p>Past Messages:</p>
// {messageComponents}

const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser}
}

export default connect(mapStateToProps, {sendMessage})(Chatroom)
