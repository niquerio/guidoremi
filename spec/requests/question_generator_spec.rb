require 'rails_helper'
describe 'POST /api/v1/question_generator' do
  it 'shows appropriate question for given generator if authenticated' do
    iqg, user, params = setup_so_mi.values_at(:iqg, :user, :params)
    header = user.create_new_auth_token
    post '/api/v1/question_generators/slug', headers: header
    expect(response).to have_http_status(:success)
    expect(response.body).to include('prompt')
    expect(response.body).to include('data:;base64,')
  end
  it 'errors without auth token' do
    iqg, user, params = setup_so_mi.values_at(:iqg, :user, :params)
    post '/api/v1/question_generators/slug' 
    expect(response).to have_http_status(:unauthorized)
  end

  def setup_so_mi
    user = create(:user, name: 'Martin')
    params = { "range" => %w(c3 c5), "num_choices"=> 2, "interval"=> -3,
               "other_intervals"=> [0, -1, -5, -6, -7, -8, -9, -10, -12],
               "prompt"=> 'Which is So Mi?', "same_start"=> true }
    iqg = create(:interval_question_generator, name: 'so-mi-1', parameters: params)
    { user: user, iqg: iqg, params: params }
  end
end
