require 'rails_helper'

RSpec.describe IntervalQuestionGenerator, 'note2num' do
  it 'outputs appropriate number for middle c' do
    iqg = create(:interval_question_generator)
    expect(iqg.note2num('c4')).to eq(60)
  end
  it 'outputs appropriate number for fs above middle c' do
    iqg = create(:interval_question_generator)
    expect(iqg.note2num('fs4')).to eq(66)
  end
end
RSpec.describe IntervalQuestionGenerator, 'make_question' do
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
    it 'has notes in the correct range' do
      iqg, user = setup_so_mi.values_at(:iqg, :user)
 
      iqg.make_question(user)
      Choice.all.each do |c|
        note_on(c.midi).each do |note|
          expect(note).to be >= 48
          expect(note).to be <= 72
        end
      end
    end
    it 'choices have the same starting note' do
      iqg, user = setup_so_mi.values_at(:iqg, :user)
 
      iqg.make_question(user)
      first_notes = []
      Choice.all.each do |c|
        first_notes.push(note_on(c.midi).first)
      end
      expect(first_notes[0]).to eq(first_notes[1])
    end
    it 'correct choice has appopriate interval' do
      iqg, user, params = setup_so_mi.values_at(:iqg, :user, :params)
      iqg.make_question(user)
      c = Choice.find(Answer.first.correct_answer) 
      notes = note_on(c.midi)
      expect(notes[1] - notes[0]).to eq(params[:interval])
    end
    it 'incorrect choice has appopriate interval' do
      iqg, user, params = setup_so_mi.values_at(:iqg, :user, :params)
      iqg.make_question(user)
      correct_id = Answer.first.correct_answer
      Choice.all.each do |c|
        unless c.id == correct_id.to_i
          notes = note_on(c.midi)
          expect(params[:other_intervals]).to  include(notes[1]-notes[0])
        end
      end
       
    end
    it 'generates different question each time' do
      iqg, user, params = setup_so_mi.values_at(:iqg, :user, :params)
      iqg.make_question(user)
      iqg.make_question(user)
      expect(Choice.first.midi).not_to eq(Choice.third.midi)
    end
    it 'generates all potential incorrect intervals are covered and are appropriate' do
      iqg, user, params = setup_so_mi.values_at(:iqg, :user, :params)
      intervals_not_covered = params[:other_intervals].dup
      (0..100).each do
        q = iqg.make_question(user)
        id = q.answer.correct_answer.to_i
        q.choices.each do |c| 
          unless c.id == id
            notes = note_on(c.midi)
            wrong_interval = notes[1] - notes[0]
            expect(params[:other_intervals]).to include(wrong_interval)
            intervals_not_covered.delete wrong_interval
          end
        end
      end
      expect(intervals_not_covered.empty?).to be

    end
    def setup_so_mi
      user = create(:user)
      params = { range: %w(c3 c5), num_choices: 2, interval: -3,
                 other_intervals: [0, -1, -5, -6, -7, -8, -9, -10, -12],
                 prompt: 'Which is So Mi?', same_start: true }
      iqg = create(:interval_question_generator, name: 'so-mi-1', parameters: params)
      { user: user, iqg: iqg, params: params }
    end
  end
  describe 'other situations' do
    it 'has more than 2 choices' do
      user, params = setup_params.values_at(:user, :params)
      params[:num_choices] = 5
     
      iqg = create(:interval_question_generator, name: 'other', parameters: params)
      
      iqg.make_question(user)
      expect(Choice.count).to eq(5)
    end
    it 'if same_start false, first notes are not the same' do
      user, params = setup_params.values_at(:user, :params)
      params[:same_start] = false
      iqg = create(:interval_question_generator, name: 'other', parameters: params)
      iqg.make_question(user)
      start_notes = []
      Choice.all.each do |c|
        start_notes.push(note_on(c.midi)[0])
      end 
      expect(start_notes[0]).not_to eq(start_notes[1]) 
    end
    def setup_params
      user = create(:user)
      params = { range: %w(c3 c5), num_choices: 5, interval: -3,
                 other_intervals: [0, -1, -5, -6, -7, -8, -9, -10, -12],
                 prompt: 'Which is So Mi?', same_start: true }
      return {user: user, params: params}
    end
  end
end

RSpec.describe IntervalQuestionGenerator, 'validations' do
end
