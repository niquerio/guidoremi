class AddSlugToQuestionGenerator < ActiveRecord::Migration[5.0]
  def change
    add_column :question_generators, :slug, :string
  end
end
