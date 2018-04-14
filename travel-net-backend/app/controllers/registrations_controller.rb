class RegistrationsController < Devise::RegistrationsController

  before_action :configure_permitted_parameters

  def new
    super
  end

 def create
   build_resource(authentication_params)
   resource.save
   if resource.persisted?
     if resource.active_for_authentication?
       render json: payload(resource), status: 200
     else
       byebug
     end
    else
      render :json => {:errors => resource.errors.messages}, :status => 420
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
