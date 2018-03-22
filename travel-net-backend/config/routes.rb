Rails.application.routes.draw do

  # , defaults: { format: :json }

  resources :messages
  resources :chatrooms
  resources :trips

  get 'home' => 'home#index'

  post 'auth_user' => 'authentication#authenticate_user'

  post '/users/search' => 'users#search'
  # post '/users' => 'users#create'


  # post "/users/find" => "authentication#authenticate_user"
  post "/users/request" => "users#request_friendship"
  post "/users/viewrequests" => "users#view_requests"
  post "/users/addfriend" => "users#add_friend"


  get '/users/:id/friends' => 'users#friends'
  post "/users/:id" => "users#show"

  get '/trips/:id/locations' => 'trips#show_locations'

  post '/chatrooms/find' => 'chatrooms#find_or_create_by'
  post '/chatrooms/:chatroom_id/authorize', to: 'chatrooms#open'
	post '/chatrooms/:chatroom_id/add_message', to: 'chatrooms#add_message'
	post '/chatrooms/delete_message', to: 'chatrooms#delete_message'

  devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions"}, defaults: { format: :json }

  mount ActionCable.server => '/cable'

  # post '/trips/addtotrip' => 'trips#add_to_trip'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
