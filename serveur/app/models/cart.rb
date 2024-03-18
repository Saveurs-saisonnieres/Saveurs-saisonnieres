class Cart < ApplicationRecord
  has_many :user_carts
  has_many :users, through: :user_carts
  has_many :cart_products
  has_many :products, through: :cart_products
end
