class Score < ApplicationRecord
  belongs_to :question_generator
  belongs_to :user
  

  def update_score(status)
    if status == 'correct'
      self.current_streak = self.current_streak + 1  
      self.highest_streak = self.highest_streak + 1 if self.current_streak > self.highest_streak

      self.complete = true if self.highest_streak >= 10
    elsif status == 'incorrect'
      self.current_streak = 0
    else
      puts 'error'
    end
    self.save!
  end

end
