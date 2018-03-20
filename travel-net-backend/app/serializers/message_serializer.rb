class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content
  belongs_to :chatroom
  belongs_to :user

  # belongs_to :recipient, class_name: "User", foreign_key: "recipient_id"
  # belongs_to :sender, class_name: "User", foreign_key: "sender_id"
end
