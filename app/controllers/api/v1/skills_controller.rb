module Api
  module V1
    class SkillsController < ApiController
      def index
        @skills = Skill.all
        @scores = Score.where(user: current_user)
      end
    end
  end
end
