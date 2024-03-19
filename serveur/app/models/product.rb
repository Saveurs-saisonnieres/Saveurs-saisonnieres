class Product < ApplicationRecord
  has_many :cart_products
  has_many :carts, through: :cart_products
  validates :name, length: { minimum: 3, maximum: 50 }, presence: true
  validates :price, numericality: { greater_than: 0,message: "Doit etre superieur a 0" }, presence: true
  validates :description, length: { minimum: 10, maximum: 150}, presence: true
  validates :origin, presence: true
  validates :variety, presence: true
end
