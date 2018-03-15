class UsersController < ApplicationController

  before_action :set_user, only: [:show,:update,:destroy]

  def show
    render json: @user, status: 200
  end

  def find
    @user = User.find_by(username: params[:username])
    render json: @user, status: 200
  end

  def search
    @users = User.all.select { |user| user.username.downcase.include?(params[:query]) }
    render json: @users, status: 200
  end

  def request_friendship
    @current_user = User.find(params[:currentUser][:id])
    @add_friend = User.find(params[:requestFriend][:id])
    @current_user.friend_request(@add_friend)
    render json: {status: 200, message: "Sent Friend Request"}
  end

  def view_requests
    @current_user = User.find(params[:currentUser][:id])
    @requests = @current_user.requested_friends
    render json: @requests, status: 200
  end

  def add_friend
    @current_user = User.find(params[:currentUser][:id])
    @friend = User.find(params[:friend][:id])
    @current_user.accept_request(@friend)
    @friends = @current_user.friends
    render json: @friends, status: 200
  end

  def friends
    @current_user = User.find(params[:user_id])
    @friends = @current_user.friends
    render json: @friends, status: 200
  end

  def create
    user = User.new(user_params)
    if user.valid?
      user.save
      render json: user, status: 201
    else
      render json: { errors: user.errors.full_messages}, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :lat, :lng, :bio)
  end

  def set_user
    @user = User.find(params[:id])
  end

end
