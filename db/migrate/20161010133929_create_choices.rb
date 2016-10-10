class CreateChoices < ActiveRecord::Migration[5.0]
  def change
    create_table :choices do |t|
      t.references :multiple_choice_question, foreign_key: true
      t.string :midi
      t.timestamps
    end
  end
end
