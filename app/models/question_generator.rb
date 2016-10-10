class QuestionGenerator < ApplicationRecord
  serialize :parameters
  validates :name, :parameters, presence: true
  has_many :multiple_choice_questions
end
