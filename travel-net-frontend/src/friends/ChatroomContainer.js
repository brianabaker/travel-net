import React from 'react'
import Chatroom from './Chatroom'
// import ChatroomList from './ChatroomList'
import {connect} from 'react-redux'
import {fetchChat} from '../actions/chats'
class ChatroomContainer extends React.Component {
state = {
		chatroom: ''
	}

	componentDidMount(){
		if (this.props.friendId) {
			 this.props.fetchChat(this.props.currentUser, this.props.friendId)
		} else {
			this.props.fetchChat(this.props.currentUser, this.props.friend_id)
		}
	}

	addMessage = (message) => {
		let copyChat = {...this.props.chatroom}
		copyChat.messages.push(message)
		this.setState({
			chatroom: copyChat
		}, () => console.log(this.state.chatroom))
	}

	render() {
		return (
			<div>
				{this.props.chatroom ? <Chatroom addMessage={this.addMessage} chatroom={this.props.chatroom}/> : "Loading"}
			</div>
		);
	}
}


const mapStateToProps = (state) => {
  return {currentUser: state.users.currentUser,
          selectedUser: state.users.selectedUser,
					chatroom: state.chats.chatroom,
					messages: state.chats.messages}
}

export default connect(mapStateToProps, {fetchChat})(ChatroomContainer)
