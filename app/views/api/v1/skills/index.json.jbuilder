json.array!(@skills) do |skill|
  json.slug skill.slug
  json.name skill.name
  json.question_generators do
    json.array!(skill.question_generators) do |qg|
      json.slug qg.slug
      json.name qg.name
    end
  end
end
