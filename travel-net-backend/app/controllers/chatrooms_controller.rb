class ChatroomsController < ApplicationController

	def create
		chatroom = Chatroom.create()
		render json: prepare_chatroom(chatroom)
	end

	# def index
  #   byebug
	# 	render json: Chatroom.all.map { |chatroom| prepare_chatroom(chatroom)  }
	# end

  def find_or_create_by
    @current_user = User.find(params[:currentUser][:id])
    @friend = User.find(params[:friend])

		if Chatroom.find_by(user1_id: @current_user.id, user2_id: @friend.id)
			chatroom = Chatroom.find_by(user1_id: @current_user.id, user2_id: @friend.id)
			render json: prepare_chatroom(chatroom)
		elsif Chatroom.find_by(user1_id: @friend.id, user2_id: @current_user.id)
			chatroom = Chatroom.find_by(user1_id: @friend.id, user2_id: @current_user.id)
			render json: prepare_chatroom(chatroom)
		else
			@chatroom = Chatroom.create(user1_id: @current_user.id, user2_id: @friend.id)
			render json: prepare_chatroom(@chatroom)
		end

  end

	def open
		chatroom = Chatroom.find(params[:chatroom_id])
		if chatroom
			render json: prepare_chatroom(chatroom, true)
		else
			render json: {error: "You dun goofed!"}
		end
	end

	def add_message
		chatroom = Chatroom.find(params[:chatroom_id])
		user = User.find(params[:user_id])
		if chatroom && user
			message = Message.create(chatroom: chatroom, user: user, content: params[:content])

			ChatroomChannel.broadcast_to(chatroom, {
				type: 'ADD_MESSAGE',
				payload: prepare_message(message)
			})
			render json: prepare_message(message)
		else
			render json: {error: "You dun goofed!"}
		end

	end

	# def delete_message
	#
	# 	Message.find(params["message_id"]).destroy
	#
	# 	chatroom = Chatroom.find(params["chatroom_id"])
	#
	# 	ChatroomChannel.broadcast_to(chatroom, {
	# 			type: "DELETE_MESSAGE",
	# 			payload: {message_id: params["message_id"]}
	# 		})
	# end

	private

	def prepare_chatroom(chatroom)
		chatroom_hash = {
			id: chatroom.id
		}
		chatroom_hash[:messages] = chatroom.messages.map {|message| prepare_message(message)}
		chatroom_hash
	end

	def prepare_message(message)
		message_hash = {
			id: message.id,
			content: message.content,
			user_id: message.user_id
		}
	end

end
