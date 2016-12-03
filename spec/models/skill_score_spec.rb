require 'rails_helper'

RSpec.describe SkillScore, type: :model do
  it { should belong_to(:skill) }
  it { should belong_to(:user) }
end

RSpec.describe SkillScore, 'update_total' do
  before(:each) do
    user = create(:user)
    skill = create(:skill)
    qg1 = create(:question_generator, skill: skill)
    qg2 = create(:question_generator, skill: skill)

    @score1 = create(:score, question_generator: qg1, user: user)
    @score2 = create(:score, question_generator: qg1, user: user)
    @skill_score = create(:skill_score, skill:skill, user:user)
  end
  it 'updates total qgs for given skill before_create' do
    expect(@skill_score.total).to eq(2)
  end

end

RSpec.describe SkillScore, 'update_complete' do
  before(:each) do
    user = create(:user)
    skill = create(:skill)
    qg1 = create(:question_generator, skill: skill)
    qg2 = create(:question_generator, skill: skill)

    @score1 = create(:score, question_generator: qg1, user: user)
    @score2 = create(:score, question_generator: qg1, user: user)
    @skill_score = create(:skill_score, skill:skill, user:user)
  end
  it 'updates number complete when qg completed' do


    expect(@skill_score.complete).to eq(0)

    @score1.update(complete: true)
    @skill_score.update_complete
    expect(@skill_score.complete).to eq(1)
  end
end 
