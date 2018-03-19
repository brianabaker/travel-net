class TripLocationsSerializer < ActiveModel::Serializer
  attributes :id, :lat, :lng
  belongs_to :trip
end
