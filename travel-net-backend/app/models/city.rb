class City < ApplicationRecord

  has_many :users
  belongs_to :region

end
