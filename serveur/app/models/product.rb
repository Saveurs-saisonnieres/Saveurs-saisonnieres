class Product < ApplicationRecord
  has_many :cart_products
  has_many :carts, through: :cart_products
  has_one_attached :image

  def img_url
    Rails.application.routes.url_helpers.rails_blob_url(self.image, only_path: true)
  end
end
