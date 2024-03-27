class OrdersController < ApplicationController
  before_action :set_order, only: %i[ show update destroy ]

  # New order
  def new
    @order = Order.new
  end


  # GET /orders/1

  # POST /orders
  def create
    @stripe_amount = 500
begin
  customer = Stripe::Customer.create({
  email: params[:stripeEmail],
  source: params[:stripeToken],
  })
  charge = Stripe::Charge.create({
  customer: customer.id,
  amount: @stripe_amount,
  description: "Achat d'un produit",
  currency: 'eur',
  })
rescue Stripe::CardError => e
  flash[:error] = e.message
  redirect_to new_order_path
end
# After the rescue, if the payment succeeded
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def order_params
      params.require(:order).permit(:user_id, :order_date, :status)
    end
end
