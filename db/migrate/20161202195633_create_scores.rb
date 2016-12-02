class CreateScores < ActiveRecord::Migration[5.0]
  def change
    create_table :scores do |t|
      t.references :question_generator, foreign_key: true
      t.references :user, foreign_key: true
      t.boolean :complete, default: false
      t.integer :current_streak, default: 0
      t.integer :highest_streak, default: 0

      t.timestamps
    end
  end
end
