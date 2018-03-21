class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  has_many :trips
  validates :username,uniqueness: true

  has_many :chatrooms, class_name: "Chatroom", foreign_key: "user1"
  has_many :chatrooms, class_name: "Chatroom", foreign_key: "user2"

  # has_many :chatrooms
  has_many :messages
  has_friendship


  def email_required?
    false
  end

  def will_save_change_to_email?
    false
  end


end
