class QuestionGenerator < ApplicationRecord
  serialize :parameters
  validates :name, :parameters, :slug, presence: true
  has_many :multiple_choice_questions
  belongs_to :skill, optional: true
end
