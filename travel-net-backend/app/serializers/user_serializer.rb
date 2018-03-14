class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :city

  belongs_to :city
end
