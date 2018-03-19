class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :timestamps
  has_many :trip_locations
  belongs_to :user
end
