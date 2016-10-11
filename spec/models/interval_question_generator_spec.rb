require 'rails_helper'
RSpec.describe IntervalQuestionGenerator, 'make_question' do
  describe 'so_mi' do
    it 'Has correct prompt' do
      iqg = setup_so_mi

      iqg.make_question
      question = MultipleChoiceQuestion.first
      expect(question).to be_present
      expect(question.prompt).to eq('Which is So Mi?')
    end
    it 'has two choices' do
      iqg = setup_so_mi

      iqg.make_question
      expect(Choice.count).to eq(2)
    end 
    it 'has an answer' do
      iqg = setup_so_mi

      iqg.make_question
      expect(Answer.first).to be_present
    end
    it 'has correct answer with id of one of the choices' do
      iqg = setup_so_mi

      iqg.make_question
      expect(Choice.ids.to_s).to contain(Answer.first.correct_answer)
    end
    def setup_so_mi
      user = create(:user)
      params = { range: ['c3','c5'], num_choices: 2, interval: -3, 
                 other_intervals: [0,-1,-5,-6,-7,-8, -9, -10,-12],
                 prompt: 'Which is So Mi?' }
      create(:interval_question_generator, name: 'so-mi-1', parameters: params)
    end
  end
end

RSpec.describe IntervalQuestionGenerator, 'validations' do
end
