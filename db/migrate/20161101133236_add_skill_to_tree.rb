class AddSkillToTree < ActiveRecord::Migration[5.0]
  def change
    add_reference :trees, :skill, foreign_key: true
  end
end
