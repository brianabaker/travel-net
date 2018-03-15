Rails.application.routes.draw do

  resources :users do
    get '/friends' => 'users#friends'
  end

  post '/users/search' => 'users#search'
  post "/users/find" => "users#find"
  post "/users/request" => "users#request_friendship"
  post "/users/viewrequests" => "users#view_requests"
  post "/users/addfriend" => "users#add_friend"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
