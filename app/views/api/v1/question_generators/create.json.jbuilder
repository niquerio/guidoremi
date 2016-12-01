json.id @question.id
json.prompt @question.prompt
json.choices do 
  json.array!(@question.choices) do |choice|
    json.id choice.id
    json.name choice.name
    json.midi choice.midi
  end
end
