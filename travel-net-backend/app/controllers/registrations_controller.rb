class RegistrationsController < Devise::RegistrationsController
  def new
   super
 end

 def create
   # add custom create logic here
   @user = User.new(authentication_params)
   if @user
     @user.save
     render json: @user, status: 200
   else
     @erros = @user.errors.full_messages
     render json: @erros
   end
 end

 def update
   super
 end

 private

 def authentication_params
   params.require(:registration).permit(:username, :password, :password_confirmation, :lat, :lng)
 end

end
