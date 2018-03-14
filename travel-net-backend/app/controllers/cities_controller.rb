class CitiesController < ApplicationController


  def create
    @country = Country.find_or_create_by(name: params[:country])
    @region = Region.find_or_create_by(name: params[:region])
    @city = City.find_by(name: params[:city])
    byebug
    if @city
      render json: @city, status: 200
    else

      @city = City.new(name: params[:city])
      byebug
      @city.lat = params[:lat]
      @city.lng = params[:lng]
      @city.save
      byebug
      render json: @city, status: 200
    end
  end

end
