import React from 'react'
import { ActionCable } from 'react-actioncable-provider';

import {connect} from 'react-redux'
import {sendMessage, addMessage} from '../actions/chats'

class Chatroom extends React.Component {

	state = {
		content: ""
	}

	componentDidMount() {
		if (this.props.chatroom.messages.length > 5) {
			this.scrollToBottom();
		}
	}

	componentDidUpdate() {
		if (this.props.chatroom.messages.length > 5){
			this.scrollToBottom();
		}
	}

	scrollToBottom() {
		this.el.scrollIntoView({ behavior: 'smooth' });
	}


	handleChange = (event) => {
		this.setState({
			content: event.target.value
		})
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
      default:
        console.log(data);
    }
  };


	render(){
    let messageComponents = ''
    {this.props.chatroom.messages ?
      (messageComponents = this.props.chatroom.messages.map(message => {
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

export default connect(mapStateToProps, {sendMessage, addMessage})(Chatroom)
