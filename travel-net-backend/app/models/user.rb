class User < ApplicationRecord
  has_many :trips

  has_many :chatrooms, class_name: "Chatroom", foreign_key: "user1"
  has_many :chatrooms, class_name: "Chatroom", foreign_key: "user2"

  # has_many :chatrooms
  has_many :messages
  has_friendship
end
