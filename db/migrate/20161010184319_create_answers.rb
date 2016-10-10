class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.references :user, foreign_key: true
      t.references :question, polymorphic: true, index: true
      t.string :user_answer
      t.string :correct_answer

      t.timestamps
    end
  end
end
