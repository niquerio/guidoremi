module Api
  module V1
    class SkillsController < ApiController
      def index
        @skills = Skill.all
      end
    end
  end
end
