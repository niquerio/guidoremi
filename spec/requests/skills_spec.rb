require 'rails_helper'
describe 'Get /api/v1/skills' do
  it 'shows list of all skills and qgs  if authenticated' do
    user = create(:user, name: 'Martin')
    header = user.create_new_auth_token
    skill = create(:skill, name: 'Skill Name', slug: 'skill_slug')
    qg = create(:question_generator, skill: skill, name: 'So Mi Level 1')
    get '/api/v1/skills', headers: header
    expect(response).to have_http_status(:success)
    expect(response.body).to include('Skill Name')
    expect(response.body).to include('So Mi Level 1')
    expect(response.body).to include('complete')
  end
  it 'shows appropriate scores' do
    user = create(:user, name: 'Martin')
    header = user.create_new_auth_token
    skill = create(:skill, name: 'Skill Name', slug: 'skill_slug')
    qg = create(:question_generator, skill: skill, name: 'So Mi Level 1')
    score = create(:score, question_generator: qg, user: user, current_streak: 5, highest_streak: 5)
    get '/api/v1/skills', headers: header
    expect(response).to have_http_status(:success)
    expect(response.body).to include('Skill Name')
    expect(response.body).to include('So Mi Level 1')
    expect(response.body).to include('5')
  end
  it 'errors without auth token' do
    skill = create(:skill, name: 'Skill Name', slug: 'skill_slug')
    qg = create(:question_generator, skill: skill, name: 'So Mi Level 1')
    get '/api/v1/skills'
    expect(response).to have_http_status(:unauthorized)
  end
end
