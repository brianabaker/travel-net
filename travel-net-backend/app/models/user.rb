class User < ApplicationRecord

  has_many :trips
  has_friendship

end
