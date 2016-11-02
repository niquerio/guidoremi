class RemoveTreeFromSkills < ActiveRecord::Migration[5.0]
  def change
    remove_reference :skills, :tree, foreign_key: true
  end
end
