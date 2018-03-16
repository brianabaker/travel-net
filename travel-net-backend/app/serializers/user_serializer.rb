class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :lat, :lng, :friends
  has_friendship

end
