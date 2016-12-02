require 'rails_helper'

RSpec.describe Score, type: :model do
  it { should belong_to(:question_generator) }
  it { should belong_to(:user) }
end

RSpec.describe Score, 'update_score' do
  describe 'on correct' do
    before(:each) do
      @score = create(:score) 
    end
    it 'increase current_streak score by 1' do
      expect(@score.current_streak).to eq(0)
      @score.update_score('correct')
      expect(@score.current_streak).to eq(1)
    end
    it 'if highest_streak == current_streak increase highest_streak score by 1' do
      expect(@score.current_streak).to eq(0)
      expect(@score.highest_streak).to eq(0)
      @score.update_score('correct')
      expect(@score.highest_streak).to eq(1)
    end
    it 'if highest_streak > current_streak, highest_streak stays the same' do
      @score.update(highest_streak: 5)
      @score.update_score('correct')
      expect(@score.current_streak).to eq(1)
      expect(@score.highest_streak).to eq(5)
    end
    it 'if highest_streak == 9 and current_streak == 9; complete changes to true' do
      @score.update(highest_streak: 9)
      @score.update(current_streak: 9)
      expect(@score.complete).to be false 
      @score.update_score('correct')
      expect(@score.complete).to be true
    end
    it 'if highest_streak < 9; complete stays false' do
      @score.update(highest_streak: 8)
      @score.update(current_streak: 8)
      expect(@score.complete).to be false 
      @score.update_score('correct')
      expect(@score.complete).to be false
    end
  end
  describe 'on incorrect' do
    it 'changes current_streak to 0' do
      @score = create(:score)
      @score.update(current_streak: 8)
      @score.update_score('incorrect')
      expect(@score.current_streak).to eq(0)
    end
  end
end
