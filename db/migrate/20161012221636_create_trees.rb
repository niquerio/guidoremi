class CreateTrees < ActiveRecord::Migration[5.0]
  def change
    create_table :trees do |t|
      t.integer :level
      t.integer :order

      t.timestamps
    end
  end
end
