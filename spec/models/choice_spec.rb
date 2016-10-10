require 'rails_helper'

RSpec.describe Choice, type: :model do
  it { should belong_to(:multiple_choice_question) }
end
