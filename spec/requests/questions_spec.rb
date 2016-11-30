require 'rails_helper'
describe 'PUT /api/v1/questions/:id/answer' do
  describe  'as authorized user' do
    it 'shows the correct answer in the response' do
      iqg, user, params = setup_so_mi.values_at(:iqg, :user, :params)
      header = user.create_new_auth_token
      question = iqg.make_question(user)
      #sends question_id and user answer
      put "/api/v1/questions/#{question.id}/answer", params: {user_answer: question.answer.correct_answer}, headers: header, as: :json
      expect(response).to have_http_status(:success)
      expect(response.body).to include('correct_answer')
      expect(response.body).to include('result')
    end

    it 'updates the Answer with user answer' do
      iqg, user, params = setup_so_mi.values_at(:iqg, :user, :params)
      header = user.create_new_auth_token
      question = iqg.make_question(user)
      correct = question.answer.correct_answer
      #sends question_id and user answer
      expect(Answer.first.user_answer).to be_nil

      put "/api/v1/questions/#{question.id}/answer", params: {user_answer: correct}, headers: header, as: :json

      expect(Answer.first.user_answer).to eq(correct)
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
