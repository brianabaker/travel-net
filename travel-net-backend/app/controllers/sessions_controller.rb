class SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_signed_out_user, only: :destroy

  responders :my_application
  
  # def create
  #   self.resource = warden.authenticate!(scope: resource_name)
  #   render :create, status: :created
  # end

  def create
    super { |resource| @resource = resource }
  end

  def destroy
    byebug
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    render json: {message: "Signed Out"}
    super
  end

end
