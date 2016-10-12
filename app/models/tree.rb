class Tree < ApplicationRecord
  has_one :skill
  validates :level, :order, presence: true
end
