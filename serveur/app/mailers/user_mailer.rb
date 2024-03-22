class UserMailer < ApplicationMailer
  
  def welcome_email(user)
    @user = user 

   @url  = 'http://127.0.0.1:3000/' 

    mail(to: @user.email, subject: 'Bienvenue chez Saveurs Saisonnières !') 
  end

# def ???_confirmation_email(user, ????)
#   # @user = user
# 
#   # @??? = ???
# 
#   # mail(to: @user.email, subject: 'Confirmation : Votre commande chez Saveurs Saisonières est bien prise en compte.')
# end
# 
# def user_admin_notification(user_admin_email, cart???)
#   # @user_admin_email = user_admin_email
#   # @user_admin = User.find_by(email: @user_admin_email)
# 
#   # @cart??? = cart???
# 
#   # mail(to: @user_admin_email, subject: 'Notification : Une nouvelle commande est en cours !')
# end

  def reset_password_instructions(user)
    @user = user
    @reset_password_url = edit_user_password_url(reset_password_token: @user.reset_password_token)

    puts "reset_password_instructions method called"

    puts render_to_string(template: 'user_mailer/reset_password_instructions')

    mail(to: @user.email, subject: 'Reset your password')
  end
end