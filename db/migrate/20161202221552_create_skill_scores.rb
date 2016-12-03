class CreateSkillScores < ActiveRecord::Migration[5.0]
  def change
    create_table :skill_scores do |t|
      t.references :user, foreign_key: true
      t.references :skill, foreign_key: true
      t.integer :total, default: 0
      t.integer :complete, default: 0

      t.timestamps
    end
  end
end
