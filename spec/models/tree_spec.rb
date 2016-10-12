require 'rails_helper'
RSpec.describe Tree, type: :model do
  it { should have_one(:skill) }
end
RSpec.describe Tree, 'validations' do
  it { is_expected.to validate_presence_of(:level) }
  it { is_expected.to validate_presence_of(:order) }
end
