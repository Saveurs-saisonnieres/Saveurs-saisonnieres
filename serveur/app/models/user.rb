class User < ApplicationRecord
	# Il faut ajouter les deux modules commençant par jwt
	devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable, :jwt_authenticatable,
        jwt_revocation_strategy: JwtDenylist
  validates :email, presence: true
  has_many :user_carts
  has_many :carts, through: :user_carts

  after_create :welcome_send

  def welcome_send
    UserMailer.welcome_email(self).deliver_now
  end

end
