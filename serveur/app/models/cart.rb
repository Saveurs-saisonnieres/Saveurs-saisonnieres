class Cart < ApplicationRecord
  has_many :users
  has_many :cart_products
  has_many :products, through: :cart_products
end
