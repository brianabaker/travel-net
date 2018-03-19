class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :lat, :lng, :friends

  has_many :trips
  has_friendship

end
