class CreateMultipleChoiceQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :multiple_choice_questions do |t|
      t.references :question_generator, foreign_key: true
      t.string :prompt
      t.timestamps
    end
  end
end
