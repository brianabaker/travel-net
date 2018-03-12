class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :lat, :lng

  has_many :users
end
