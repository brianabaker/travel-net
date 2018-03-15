class UsersController < ApplicationController

  before_action :set_user, only: [:show,:update,:destroy]

  def show
    render json: @user, status: 200
  end

  def find
    @user = User.find_by(username: params[:username])
    render json: @user, status: 200
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
