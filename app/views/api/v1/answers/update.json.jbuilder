json.answer do
  json.correct_answer @answer.correct_answer
  json.result @result
end

json.score do
  json.current_streak @score.current_streak
  json.highest_streak @score.highest_streak
  json.complete @score.complete

end
json.skill_score do
  json.total @skill_score.total
  json.complete @skill_score.complete
end

json.skill_slug @skill.slug
json.qg_slug @qg.slug
