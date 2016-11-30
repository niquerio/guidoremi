module Api
  module V1
    class AnswersController < ApiController
      def update
        q = MultipleChoiceQuestion.find(params['id'])
        @answer = q.answer
        @answer.update(answer_params);
        @result = @answer.correct_answer == @answer.user_answer
      end

      private
      def answer_params
        params.require(:answer).permit(:user_answer)
      end
    end
  end
end
