class CartsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_cart, only: %i[show]
  respond_to :json  
  # GET /cart
  def show
    cart = current_user.cart
    cart_products = cart.cart_products.includes(:product)
    products = cart_products.map(&:product)
  
    render json: products
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_cart
    @cart = current_user.cart || current_user.build_cart
  end
end
