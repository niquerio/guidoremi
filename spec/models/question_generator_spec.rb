require 'rails_helper'

RSpec.describe QuestionGenerator, type: :model do
  it { should serialize(:parameters) }
  it { should have_many(:multiple_choice_questions) }
  it { should belong_to(:skill) }
end

RSpec.describe QuestionGenerator, 'validations' do
  it { is_expected.to validate_presence_of(:slug) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:parameters) }
end
