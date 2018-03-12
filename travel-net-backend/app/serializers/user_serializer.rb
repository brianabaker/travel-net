class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :location

  belongs_to :location
end
