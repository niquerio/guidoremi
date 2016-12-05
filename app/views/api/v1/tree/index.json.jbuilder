json.array!(@tree) do |branch|
  json.array!(branch.children) do |leaf|
    json.slug leaf.skill.slug
    json.name leaf.skill.name
    ss = @skill_scores.find_by(skill: leaf.skill) 
    if ss
      json.total  ss.total  
      json.complete  ss.complete  
    else
      json.total  leaf.skill.question_generators.count
      json.complete  0
    end
  end
end
