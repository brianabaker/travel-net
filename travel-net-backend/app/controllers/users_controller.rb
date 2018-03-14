class UsersController < ApplicationController

  before_action :set_user, only: [:show,:update,:destroy]

  def show
    render json: @user, status: 200
  end

  def create

    user = User.new(user_params)
    if user.valid?
      byebug
      user.save
      render json: user, status: 201
    else
      byebug
      render json: { errors: user.errors.full_messages}, status: 422
    end
  end

  private
  def user_params
    params.require(:makeUser).permit(:username, :city_id)
  end

  def set_user
    @user = User.find(params[:id])
  end

end
