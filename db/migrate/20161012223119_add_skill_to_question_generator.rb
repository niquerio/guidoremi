class AddSkillToQuestionGenerator < ActiveRecord::Migration[5.0]
  def change
    add_reference :question_generators, :skill, index: true
  end
end
