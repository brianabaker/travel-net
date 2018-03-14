class User < ApplicationRecord

  has_friendship
  belongs_to :city


end
