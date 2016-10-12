class Skill < ApplicationRecord
  belongs_to :tree
  has_many :question_generators
  validates :name, presence: true
end
