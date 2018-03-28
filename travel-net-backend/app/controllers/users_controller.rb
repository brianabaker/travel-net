class UsersController < ApplicationController

  # before_action :set_user, only: [:show,:update,:destroy,:request_friendship,:view_requests,:friends]

  # def current_user
  #
  #   render json: @user, status: 200
  # end

  def show
    # byebug
    @current_user = User.find(params[:currentUser][:id])
    @user = User.find(params[:id])
    @pending_friends = @current_user.pending_friends
    @are_friends = @current_user.friends_with?(@user)
    # render json: @user, status: 200
    response = { :user => @user, :current_user_pending_friends_array => @pending_friends, :are_friends => @are_friends}
    respond_to do |format|
      format.json  { render :json => response }
    end
  end

  def show_own_profile
    @current_user = User.find(params[:id])
    render json: @current_user, status: 200
  end

  def update
    @current_user = User.find(params[:currentUser])
    @current_user.username = params[:username]
    @current_user.bio = params[:bio]
    @current_user.profile_pic_url = params[:photoUrl]
    @current_user.save
    # response = { :user => @current_user }
    # respond_to do |format|
    #   format.json  { render :json => response }
    # end
    render json: @current_user, status: 200
  end

  def add_bio
    @current_user = User.find(params[:currentUser])
    @current_user.bio = params[:bio]
    @current_user.profile_pic_url = params[:photoUrl]
    @current_user.save
    render json: @current_user, status: 200
  end

  def search
    # byebug
    @users = User.all.select { |user| user.username.downcase.include?(params[:query]) }
    @current_user = User.find(params[:currentUserId])
    @notfriendsusers = @users.select { |user| !@current_user.friends_with?(user) }
    @alsonotcurrentuser = @notfriendsusers.select { |user| user != @current_user}
    render json: @alsonotcurrentuser, status: 200
  end

  def request_friendship
    # byebug
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
    # byebug
    @current_user = User.find(params[:currentUser][:id])
    @friend = User.find(params[:friend][:id])
    @current_user.accept_request(@friend)
    @friends = @current_user.friends
    render json: @friends, status: 200
  end

# check if this means i have to unnest user everywhere

  def friends
    # byebug
    @current_user = User.find_by(id: params[:id])
    @friends = @current_user.friends
    @all_trips = @current_user.trips
    @not_active_trips = @all_trips.select { |trip| trip.active == false }
    @sorted_trips = @not_active_trips.sort {|trip| trip.created_at }
    if @friends.length == 0
      render json: {status: 200, message: "No friends yet!"}
    else
      response = { :past_trips => @sorted_trips, :friends => @friends }
      respond_to do |format|
        format.json  { render :json => response }
      end
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
