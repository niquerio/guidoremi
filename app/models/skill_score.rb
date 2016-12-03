class SkillScore < ApplicationRecord
  belongs_to :user
  belongs_to :skill

  before_create :update_total

  def update_total
    self.total = self.skill.question_generators.count
  end

  def update_complete
    complete_qgs = 0 
    qgs = self.skill.question_generators
    qgs.each do |qg|
      score = Score.find_by(question_generator: qg, user: self.user)
      if score
        complete_qgs = complete_qgs + 1 if score.complete
      end
    end 
    self.complete = complete_qgs
  end 
end
