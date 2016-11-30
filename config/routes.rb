Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  root 'test#members_only'
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      get 'tree', to: 'tree#index' 
      get 'skills', to: 'skills#index' 
      post 'question_generators/:slug', to: 'question_generators#create' 
      put 'questions/:id/answer', to: 'answers#update'
    end
  end 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
