module Api
  module V1
    class SkillsController < ApplicationController
      def index
        @skills = Skill.all
      end
    end
  end
end
