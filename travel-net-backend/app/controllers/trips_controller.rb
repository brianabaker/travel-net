class TripsController < ApplicationController

  def create
     @current_user = User.find(params[:currentUser][:id])
     @trip = Trip.create(name: params[:tripName], user_id: @current_user.id)
     @location = TripLocation.create(trip_id: @trip.id, lat: params[:location][:lat], lng: params[:location][:lng])
     @current_user.on_trip = true
     @current_user.save
     render json: @trip, status: 200
  end

  def show_locations
    @trip = Trip.find(params[:id])
    @locations = @trip.trip_locations
    render json: @locations, status: 200
  end

  def show
    @trip = Trip.find(params[:id])
    @locations = @trip.trip_locations
    render json: @trip, status: 200
  end

  def update
    @trip = Trip.find(params[:id])
    @new_location = TripLocation.create(lat: params[:location][:lat], lng: params[:location][:lng], trip_id: @trip.id)
    @trip.user.lat = @new_location.lat
    @trip.user.lng = @new_location.lng
    @trip.save
    @trip.user.save
    render json: @trip, status:200
  end

  def add_to_trip
    byebug
  end

end
