class RegistrationsController < Devise::RegistrationsController
  def new
   super
 end

 def create
   # add custom create logic here
   user = User.new(authentication_params)
   if user.valid?
     user.save
     render json: payload(user), status: 200
   else
     @errors = user.errors.full_messages
     render :json => { :errors => @errors }, :status => 420
   end
 end

 def update
    byebug
 end

 def payload(user)
   return nil unless user and user.id
   {
     auth_token: JsonWebToken.encode({user_id: user.id}),
     user: {id: user.id, username: user.username, bio: user.bio, lat: user.lat, lng: user.lng, on_trip: user.on_trip, current_trip_id: user.current_trip_id}
   }
 end

 private

 def authentication_params
   params.require(:registration).permit(:username, :password, :password_confirmation, :lat, :lng)
 end

end
