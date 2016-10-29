require 'rails_helper'

RSpec.describe Skill, type: :model do
  it { should have_many(:question_generators) }
  it { should belong_to(:tree) }
end
RSpec.describe Skill, 'validations' do
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:slug) }
end
