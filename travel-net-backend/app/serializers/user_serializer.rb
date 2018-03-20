class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :lat, :lng, :friends

  has_many :trips
  has_friendship

  has_many :messages

  # has_many :messages, class_name: "Message", foreign_key: "recipient_id"
  #  has_many :sent_messages, class_name: "Message", foreign_key: "sender_id"

end
