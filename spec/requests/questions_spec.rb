require 'rails_helper'
describe 'PUT /api/v1/questions/:id/answer' do
  describe  'as authorized user' do
    before(:each) do
      @iqg, @user, @params = setup_so_mi.values_at(:iqg, :user, :params)
      @header = @user.create_new_auth_token
      @question = @iqg.make_question(@user)
      @correct = @question.answer.correct_answer
    end
    it 'shows the correct answer in the response' do
      put "/api/v1/questions/#{@question.id}/answer", params: {user_answer: @correct}, headers: @header, as: :json
      expect(response).to have_http_status(:success)
      expect(response.body).to include('correct_answer')
      expect(response.body).to include('result')
    end

    it 'updates the Answer with user answer' do
      expect(Answer.first.user_answer).to be_nil

      put "/api/v1/questions/#{@question.id}/answer", params: {user_answer: @correct}, headers: @header, as: :json

      expect(Answer.first.user_answer).to eq(@correct)
    end
    it 'creates new score if none already' do
      expect(Score.first).to be_nil
      put "/api/v1/questions/#{@question.id}/answer", params: {user_answer: @correct}, headers: @header, as: :json
      expect(Score.first).not_to be_nil
    end
    it 'creates new skill_score if none already' do
      expect(SkillScore.first).to be_nil
      put "/api/v1/questions/#{@question.id}/answer", params: {user_answer: @correct}, headers: @header, as: :json
      expect(SkillScore.first).not_to be_nil
    end
    it 'updates score' do
      score = create(:score, user: @user, question_generator: @iqg, current_streak: 5, highest_streak:5, complete: false)
      expect(Score.first.current_streak).to eq(5)
      put "/api/v1/questions/#{@question.id}/answer", params: {user_answer: @correct}, headers: @header, as: :json
      expect(Score.first.current_streak).to eq(6)
      expect(Score.first.highest_streak).to eq(6)
    end
    it 'updates skill_score' do
      score = create(:score, user: @user, question_generator: @iqg, current_streak: 9, highest_streak:9, complete: false)
      put "/api/v1/questions/#{@question.id}/answer", params: {user_answer: @correct}, headers: @header, as: :json
      expect(SkillScore.first.complete).to eq(1)
    end

  end

  it 'errors without auth token' do
    iqg, user, params = setup_so_mi.values_at(:iqg, :user, :params)
    question = iqg.make_question(user)
    correct = question.answer.correct_answer

    put "/api/v1/questions/#{question.id}/answer", params: {user_answer: correct}, as: :json
    expect(response).to have_http_status(:unauthorized)
  end

  def setup_so_mi
    user = create(:user, name: 'Martin')
    params = { "range" => %w(c3 c5), "num_choices"=> 2, "interval"=> -3,
               "other_intervals"=> [0, -1, -5, -6, -7, -8, -9, -10, -12],
               "prompt"=> 'Which is So Mi?', "same_start"=> true }
    iqg = create(:interval_question_generator, name: 'so-mi-1', parameters: params)
    { user: user, iqg: iqg, params: params }
  end
end
