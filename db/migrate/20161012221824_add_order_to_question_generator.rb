class AddOrderToQuestionGenerator < ActiveRecord::Migration[5.0]
  def change
    add_column :question_generators, :order, :integer
  end
end
