json.prompt @question.prompt
json.choices do 
  json.array!(@question.choices) do |choice|
    json.id choice.id
    json.midi choice.midi
  end
end