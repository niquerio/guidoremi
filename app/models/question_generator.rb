class QuestionGenerator < ApplicationRecord
  serialize :parameters
  validates :name, :parameters, :order, :slug, presence: true
  has_many :multiple_choice_questions
  belongs_to :skill
end
