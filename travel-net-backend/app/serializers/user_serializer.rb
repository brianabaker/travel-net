class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :lat, :lng, :bio, :on_trip, :current_trip_id

  has_many :trips
  # has_friendship
  # CHECK IF IT BREAKS HERE 

  has_many :messages

  # has_many :messages, class_name: "Message", foreign_key: "recipient_id"
  #  has_many :sent_messages, class_name: "Message", foreign_key: "sender_id"

end
