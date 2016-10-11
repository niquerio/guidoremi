class IntervalQuestionGenerator < QuestionGenerator
  def make_question
    range, num_choices, interval, 
    other_intervals, prompt = self.parameters.values_at(:range, :num_choices, :interval, :other_intervals, :prompt)  

    question = MultipleChoiceQuestion.create(prompt: prompt, question_generator: self)
  end
end
