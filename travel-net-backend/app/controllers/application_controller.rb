class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  include ActionController::MimeResponds
  # self.responder = ApplicationResponder
  respond_to :json


  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :password, :password_confirmation, :profile_pic, :bio) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:currentUser, :username, :password, :password_confirmation, :profile_pic, :bio) }
  end

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:lat, :lng)
  # end

#   def configure_permitted_parameters
#   devise_parameter_sanitizer.permit(:sign_up, keys: [:lat, :lng])
#   # devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email, :password, :password_confirmation, :current_password, :firstname, :middlename, :lastname, :nickname) }
# end


  # # protect_from_forgery with: :null_session
  # #
  # # before_action :configure_permitted_parameters, if: :devise_controller?
  # # DeviseController.
  # respond_to :html, :json
  #
  # protected
  # def authenticate_request!
  #   unless user_id_in_token?
  #     render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  #     return
  #   end
  #   @current_user = User.find(auth_token[:user_id])
  # rescue JWT::VerificationError, JWT::DecodeError
  #   render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  # end
  #
  # private
  # def http_token
  #     @http_token ||= if request.headers['Authorization'].present?
  #       request.headers['Authorization'].split(' ').last
  #     end
  # end
  #
  # def auth_token
  #   @auth_token ||= JsonWebToken.decode(http_token)
  # end
  #
  # def user_id_in_token?
  #   http_token && auth_token && auth_token[:user_id].to_i
  # end
end
