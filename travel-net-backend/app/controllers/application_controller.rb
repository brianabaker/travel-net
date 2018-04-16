class ApplicationController < ActionController::API

  include ActionController::MimeResponds
  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    added_attrs = [:username, :password, :password_confirmation, :lat, :lng]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
  end

end
