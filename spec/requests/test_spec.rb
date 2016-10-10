require 'rails_helper'
describe 'Get /' do
  it 'shows welcome if authenticated' do
    user = create(:user, name: 'Martin')
    header = user.create_new_auth_token
    get '/', headers: header
    expect(response).to have_http_status(:success)
    expect(response.body).to include('Welcome')
  end
end
