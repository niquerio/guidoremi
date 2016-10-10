class MultipleChoiceQuestion < ApplicationRecord
  belongs_to :question_generator
  has_many :choices
  has_one :answer, as: :question
end
