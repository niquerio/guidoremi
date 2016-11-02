module Api
  module V1
    class TreeController < ApplicationController
      def index
        @tree = Tree.root.children
      end
    end
  end
end
