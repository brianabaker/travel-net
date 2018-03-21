class AuthenticationController < ApplicationController


  # def is_signed_in?
  #   if user_signed_in?
  #     render :json => {"signed_in" => true, "user" => current_user}.to_json()
  #   else
  #     render :json => {"signed_in" => false}.to_json()
  #   end
  # end

  def authenticate_user
    user = User.find_for_database_authentication(username: params[:authentication][:username])
    if user.valid_password?(params[:authentication][:username])
      render json: payload(user)
    else
      render json: {errors: ['Invalid Username/Password']}, status: :unauthorized
    end
  end

  private

  def payload(user)
    return nil unless user and user.id
    {
      auth_token: JsonWebToken.encode({user_id: user.id}),
      user: {id: user.id, username: user.username}
    }
  end
end
