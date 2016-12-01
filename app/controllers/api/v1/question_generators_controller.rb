module Api
  module V1
    class QuestionGeneratorsController < ApiController
      def create
        user = User.find_by(uid: request.env['HTTP_UID'])
        qg = QuestionGenerator.find_by(slug: params['slug'])
        @question = qg.make_question(user)
      end
    end
  end
end
