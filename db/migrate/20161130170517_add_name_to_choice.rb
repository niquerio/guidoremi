class AddNameToChoice < ActiveRecord::Migration[5.0]
  def change
    add_column :choices, :name, :string
  end
end
