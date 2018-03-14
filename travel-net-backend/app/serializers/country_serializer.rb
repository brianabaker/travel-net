class CountrySerializer < ActiveModel::Serializer
  attributes :id, :name, :region, :city
  has_many :regions
  has_many :cities, through: :regions
end
