class AuthenticationController < ApplicationController

# responder :my_application
# it didn't like this i put this here to try and get a better render method for errors maybe i didn't need it

  def authenticate_user
    user = User.find_for_database_authentication(username: params[:authentication][:username])
    if user.valid_password?(params[:authentication][:password])
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
      user: {id: user.id, username: user.username, bio: user.bio, lat: user.lat, lng: user.lng, on_trip: user.on_trip, current_trip_id: user.current_trip_id}
    }
  end
end
