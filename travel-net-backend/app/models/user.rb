class User < ApplicationRecord

  has_friendship
  belongs_to :location

end
