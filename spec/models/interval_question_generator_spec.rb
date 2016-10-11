require 'rails_helper'
RSpec.describe IntervalQuestionGenerator, 'make_question' do
  describe 'note2num' do
    it 'outputs appropriate number for middle c' do
      iqg = create(:interval_question_generator)
      expect(iqg.note2num('c4')).to eq(60)
    end
    it 'outputs appropriate number for fs above middle c' do
      iqg = create(:interval_question_generator)
      expect(iqg.note2num('fs4')).to eq(66)
    end
  end
  describe 'so_mi' do
    it 'Has correct prompt' do
      iqg, user = setup_so_mi.values_at(:iqg, :user)

      iqg.make_question(user)
      question = MultipleChoiceQuestion.first
      expect(question).to be_present
      expect(question.prompt).to eq('Which is So Mi?')
    end
    it 'has two choices' do
      iqg, user = setup_so_mi.values_at(:iqg, :user)

      iqg.make_question(user)
      expect(Choice.count).to eq(2)
    end
    it 'has an answer' do
      iqg, user = setup_so_mi.values_at(:iqg, :user)

      iqg.make_question(user)
      expect(Answer.first).to be_present
    end
    it 'has correct answer with id of one of the choices' do
      iqg, user = setup_so_mi.values_at(:iqg, :user)

      iqg.make_question(user)
      expect(Choice.ids).to include(Answer.first.correct_answer.to_i)
    end
    def setup_so_mi
      user = create(:user)
      params = { range: %w(c3 c5), num_choices: 2, interval: -3,
                 other_intervals: [0, -1, -5, -6, -7, -8, -9, -10, -12],
                 prompt: 'Which is So Mi?', same_start: true }
      iqg = create(:interval_question_generator, name: 'so-mi-1', parameters: params)
      { user: user, iqg: iqg }
    end
  end
end

RSpec.describe IntervalQuestionGenerator, 'validations' do
end
