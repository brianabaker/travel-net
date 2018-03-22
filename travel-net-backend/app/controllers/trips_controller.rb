class TripsController < ApplicationController

  def create
     @current_user = User.find(params[:currentUser][:user][:id])
     @trip = Trip.create(name: params[:tripName], user_id: @current_user.id)
     @location = TripLocation.create(trip_id: @trip.id, lat: params[:location][:lat], lng: params[:location][:lng])
     @current_user.on_trip = true
     @current_user.current_trip_id = @trip.id
     @current_user.save
     response = { :user => @current_user, :trip => @trip }
     respond_to do |format|
       format.json  { render :json => response }
     end
    end

  def show_locations
    # byebug
    @trip = Trip.find(params[:id])
    @locations = @trip.trip_locations
    render json: @locations, status: 200
  end

  def show
    # byebug
    @trip = Trip.find(params[:id])
    @locations = @trip.trip_locations
    render json: @trip, status: 200
  end

  def update
    # byebug
    @trip = Trip.find(params[:id])
    @new_location = TripLocation.create(lat: params[:location][:lat], lng: params[:location][:lng], trip_id: @trip.id)
    @trip.user.lat = @new_location.lat
    @trip.user.lng = @new_location.lng
    @trip.save
    @trip.user.save
    render json: @trip, status:200
  end

end
