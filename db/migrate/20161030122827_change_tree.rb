class ChangeTree < ActiveRecord::Migration[5.0]
  def change
    add_column :trees, :parent_id, :integer 
  end
end
