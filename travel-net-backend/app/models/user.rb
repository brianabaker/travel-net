class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  include Devise::JWT::RevocationStrategies::Whitelist

  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :trips
  validates :username,uniqueness: true
  has_many :chatrooms, class_name: "Chatroom", foreign_key: "user1"
  has_many :chatrooms, class_name: "Chatroom", foreign_key: "user2"

  # has_many :chatrooms
  has_many :messages
  has_friendship

  def on_jwt_dispatch(token, payload)
    super
    do_something(token, payload)
  end

  def email_required?
    false
  end

  def will_save_change_to_email?
    false
  end


end
