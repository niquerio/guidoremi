module Api
  module V1
    class AnswersController < ApiController
      def update
        q = MultipleChoiceQuestion.find(params['id'])
        qg = q.question_generator
        skill = qg.skill
        @answer = q.answer
        @answer.update(answer_params);
        @result = @answer.correct_answer == @answer.user_answer
        score = Score.find_or_create_by(user: current_user, question_generator: qg)
        score.update(complete: false, highest_streak: 0, current_streak: 0) if score.complete.nil?
        skill_score = SkillScore.find_or_create_by(user: current_user,  skill: skill)
        if @result
          score.update_score('correct') 
        else
          score.update_score('incorrect') 
        end
          skill_score.update_complete
      end

      private
      def answer_params
        params.require(:answer).permit(:user_answer)
      end
    end
  end
end
