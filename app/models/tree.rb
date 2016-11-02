class Tree < ApplicationRecord
   extend ActsAsTree::TreeView
  belongs_to :skill, optional: true
  acts_as_tree order: 'level'
  validates :level, presence: true
end
