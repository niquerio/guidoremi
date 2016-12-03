module Api
  module V1
    class TreeController < ApiController
      def index
        @tree = Tree.root.children
        @skill_scores = SkillScore.where(user: current_user)
      end
    end
  end
end
