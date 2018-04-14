class AuthenticationController < ApplicationController

  def authenticate_user
    user = User.find_for_database_authentication(username: params[:authentication][:username])
    if user && user.valid_password?(params[:authentication][:password])
      render json: payload(user)
    else
      render json: {error: 'Invalid Username/Password'}, status: :unauthorized
    end
  end

  def active_user
    if request.headers['Authorization']
      token = request.headers['Authorization']
      decoded_token = JsonWebToken.decode(token)
      @current_user = User.find_by(id: decoded_token[:user_id])
      render json: current_user
    else
      render json: {'error': 'There is no current user'}
    end
  end

  private

  def payload(user)
    return nil unless user and user.id
    {
      auth_token: JsonWebToken.encode({user_id: user.id}),
      user: {id: user.id, username: user.username, bio: user.bio, lat: user.lat, lng: user.lng, on_trip: user.on_trip, current_trip_id: user.current_trip_id}
    }
  end
end
