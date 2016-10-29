class AddSlugToSkill < ActiveRecord::Migration[5.0]
  def change
    add_column :skills, :slug, :string
  end
end
