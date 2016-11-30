module Api
  module V1
    class TreeController < ApiController
      def index
        @tree = Tree.root.children
      end
    end
  end
end
