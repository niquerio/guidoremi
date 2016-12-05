json.array!(@skills) do |skill|
  json.slug skill.slug
  json.name skill.name
  json.question_generators do
    json.array!(skill.question_generators) do |qg|
      json.slug qg.slug
      json.name qg.name
      score = @scores.find_by(question_generator: qg)
      if score
        json.complete  score.complete
        json.current_streak  score.current_streak
        json.highest_streak  score.highest_streak
      else
        json.complete  false
        json.current_streak  0 
        json.highest_streak  0
      end
    end
  end
end
