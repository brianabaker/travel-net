class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :country, :region
end
