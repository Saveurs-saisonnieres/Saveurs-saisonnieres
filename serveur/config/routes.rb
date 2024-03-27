Rails.application.routes.draw do
  resources :order_items, only: [:index, :show, :create]
  resources :orders, only: [:new, :create]
  
  get '/cart', to: 'carts#show'
  # post '/add_to_cart', to: 'cart_products#create' 
  # delete '/cart_products/:productId', to: 'cart_products#destroy', as: 'delete_cart_product'
  # patch '/cart_products/:productId', to: 'cart_products#update', as: 'update_cart_product'
  resources :cart_products, only: [:create, :destroy, :update]
  resources :products do
    resources :product_images, only: [:create,:update, :destroy]
  end
  devise_for :users,
            controllers: {
              sessions: 'users/sessions',
              registrations: 'users/registrations'
            }

  get '/member-data', to: 'members#show'

  scope '/checkout' do
    post '/create', to: 'checkout#create', as: 'checkout_create'
    get '/success', to: 'checkout#success', as: 'checkout_success'
    get '/cancel', to: 'checkout#cancel', as: 'checkout_cancel'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
