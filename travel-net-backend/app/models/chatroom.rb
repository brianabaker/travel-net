class Chatroom < ApplicationRecord
  has_many :messages
  # has_many :users

  has_many :user1, class_name: "User", foreign_key: "user1"
  has_many :user2, class_name: "User", foreign_key: "user2"
end
