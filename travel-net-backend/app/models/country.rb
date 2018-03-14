class Country < ApplicationRecord

  has_many :regions
  has_many :cities, through: :regions
  has_many :users, through: :cities

end
