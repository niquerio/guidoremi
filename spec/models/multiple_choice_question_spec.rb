require 'rails_helper'

RSpec.describe MultipleChoiceQuestion, type: :model do
  it { should have_many(:choices) }
  it { should belong_to(:question_generator) }
  it { should have_one(:answer) }
end
