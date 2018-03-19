class TripSerializer < ActiveModel::Serializer
  attributes :id, :locations, :name, :timestamps
  belongs_to :user
end
