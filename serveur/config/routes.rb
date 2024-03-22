Rails.application.routes.draw do
  
  get '/cart', to: 'carts#show'
  post '/add_to_cart', to: 'cart_products#create' 
  delete '/cart_products/:productId', to: 'cart_products#destroy', as: 'delete_cart_product'

  resources :products do
    resources :product_images, only: [:create, :destroy]
  end
  devise_for :users,
            controllers: {
              sessions: 'users/sessions',
              registrations: 'users/registrations'
            }
  get '/member-data', to: 'members#show'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
