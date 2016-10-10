class CreateQuestionGenerators < ActiveRecord::Migration[5.0]
  def change
    create_table :question_generators do |t|
      t.string :name
      t.text :parameters
      t.string :type

      t.timestamps
    end
  end
end
