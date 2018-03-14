class RegionSerializer < ActiveModel::Serializer
  attributes :id, :name, :country, :city
  belongs_to :country

  has_many :cities
end
