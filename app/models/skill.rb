class Skill < ApplicationRecord
  belongs_to :tree, optional: true
  has_many :question_generators
  validates :name, :slug, presence: true
end
