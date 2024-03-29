class OrderMailer < ApplicationMailer
    def confirmation_order(order)
        @order=order
        mail(to: @order.user.email, subject: 'Confirmation de votre commande chez Saveurs Saisonières')
    end
end