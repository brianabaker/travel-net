class TripsController < ApplicationController

  def create
     @current_user = User.find(params[:currentUser][:id])
     @trip = Trip.create(name: params[:tripName], user_id: @current_user.id)
     @location = TripLocation.create(trip_id: @trip.id, lat: params[:location][:lat], lng: params[:location][:lng])
     @current_user.on_trip = true
     @current_user.current_trip_id = @trip.id
     @current_user.lat = @location.lat
     @current_user.lng = @location.lng
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

  def show_photos
     # byebug
    @trip = Trip.find(params[:id])
    @photos = @trip.trip_photos
    render json: @photos, status: 200
  end

  def show
    # byebug
    @trip = Trip.find(params[:id])
    @locations = @trip.trip_locations
    render json: @trip, status: 200
  end

  def edit_trip_location
    # byebug
    @trip_location = TripLocation.find(params[:id])
    @trip_location.lat = params[:lat]
    @trip_location.lng = params[:lng]
    @trip_location.save
    render json: @trip_location, status: 200
  end

  def add_trip_location
    # byebug
    @trip = Trip.find(params[:id])
    @new_location = TripLocation.create(lat: params[:location][:lat], lng: params[:location][:lng], trip_id: @trip.id)
    @trip.user.lat = @new_location.lat
    @trip.user.lng = @new_location.lng
    @trip.save
    @trip.user.save
    render json: @trip, status: 200
  end

  def end_trip
    # byebug
    @current_user = User.find(params[:currentUser][:id])

    @trip = Trip.find(params[:id])
    @trip.active = false
    @trip.save

    @current_user.on_trip = false
    @current_user.current_trip_id = ''
    @current_user.save
    response = { :user => @current_user, :past_trip => @trip }
    respond_to do |format|
      format.json  { render :json => response }
    end
  end

  def add_photos
    @trip = Trip.find(params[:id])
    @photos = params[:photoUrl][:filesUploaded]
    @photo_urls = @photos.map { |photo| photo["url"] }
    @photo_urls.map {|photo_url| TripPhoto.create(trip_photo_url: photo_url, trip_id: @trip.id)}
    @all_trip_photos = @trip.trip_photos
    @most_recent_photo = (@all_trip_photos[@all_trip_photos.length - 1])
    @trip.most_recent_photo_url = @most_recent_photo.trip_photo_url
    @trip.save
    render json: @all_trip_photos, status: 200
  end

end
