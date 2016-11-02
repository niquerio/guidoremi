json.array!(@tree) do |branch|
  json.array!(branch.children) do |leaf|
    json.slug leaf.skill.slug
    json.name leaf.skill.name
  end
end
