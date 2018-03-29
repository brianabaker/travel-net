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
		this.props.fetchChat(this.props.currentUser, this.props.friendId)
		console.log('thisstatechat', this.state.chatroom)
		// this.setState({
		// 	chatroom: this.
		// })
		// } else {
		// 	this.props.fetchChat(this.props.currentUser, this.props.friend_id)
		// }
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (this.state.chatroom) {
	// 		if (this.state.chatroom.messages !== nextProps.chatroom.messages) {
	// 			return true
	// 		}
	// 	} else if (this.state.chatroom == '') {
	// 		return true
	// 	}
	// 	if (this.state.chatroom !== nextState.chatroom){
	// 		return true
	// 	}
	// }

	componentWillReceiveProps(nextProps) {
		if (this.props.friendId !== nextProps.friendId) {
			this.props.fetchChat(this.props.currentUser, nextProps.friendId)
		}
		if (this.props.chatroom) {
			this.setState({
				chatroom: this.props.chatroom
			}, () => console.log(this.state.chatroom))
		}
	}

	addMessage = (message) => {
		console.log(this.state.chatroom)
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
