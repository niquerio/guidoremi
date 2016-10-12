class CreateSkills < ActiveRecord::Migration[5.0]
  def change
    create_table :skills do |t|
      t.string :name
      t.string :notes
      t.references :tree, foreign_key: true

      t.timestamps
    end
  end
end
