class UsersController < ApplicationController

  # before_action :set_user, only: [:show,:update,:destroy,:request_friendship,:view_requests,:friends]

  # def current_user
  #
  #   render json: @user, status: 200
  # end

  def show
    # byebug
    @current_user = User.find(params[:currentUser][:user][:id])
    @user = User.find(params[:id])
    # @are_friends = @current_user.friends(@user)
    render json: @user, status: 200
  end

  def search
    @users = User.all.select { |user| user.username.downcase.include?(params[:query]) }
    render json: @users, status: 200
  end

  def request_friendship
    byebug
    @current_user = User.find(params[:currentUser])
    @add_friend = User.find(params[:requestFriend])
    @current_user.friend_request(@add_friend)
    render json: {status: 200, message: "Sent Friend Request"}
  end

  def view_requests
    # byebug
    @current_user = User.find(params[:currentUser][:id])
    @requests = @current_user.requested_friends
    if @requests.length == 0
      render json: {status: 200, message: "No friend requests"}
    else
      render json: @requests, status: 200
    end
  end

  def add_friend
    byebug
    @current_user = User.find(params[:currentUser][:user][:id])
    @friend = User.find(params[:friend][:id])
    @current_user.accept_request(@friend)
    @friends = @current_user.friends
    render json: @friends, status: 200
  end

  def friends
    # byebug
    @current_user = User.find_by(id: params[:id])
    @friends = @current_user.friends
    if @friends.length == 0
      render json: {status: 200, message: "No friends yet!"}
    else
      render json: @friends, status: 200
    end
  end

  # create is done by devise

  private
  def user_params
    params.require(:user).permit(:username, :lat, :lng, :bio, :password, :passwordConfirmation, :email)
  end

  # def set_user
  #   byebug
  #   @user = User.find(params[:currentUser][:id])
  # end

end
