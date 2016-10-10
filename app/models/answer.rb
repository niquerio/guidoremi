class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question, polymorphic: true
end
