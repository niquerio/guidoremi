require 'rails_helper'
describe 'Get /api/v1/tree' do
  it 'shows skill tree if authenticated' do
    user = create(:user, name: 'Martin')
    header = user.create_new_auth_token
    skill = create(:skill, name: 'Skill Name', slug: 'skill_slug')
    qg = create(:question_generator, skill: skill)
    tree = create(:tree, level:0)
    branch = tree.children.create(level: 0)
    leaf = branch.children.create(level: 0, skill: skill)
    get '/api/v1/tree', headers: header
    expect(response).to have_http_status(:success)
    expect(response.body).to include('Skill Name')
    expect(response.body).to include('complete')
    expect(response.body).to include('total')
  end
end
