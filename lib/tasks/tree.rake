require 'yaml'
require 'csv'
namespace :tree do
  task add_new_and_update_iqgs: :environment do
    iqgs = YAML.load_file('lib/seeds/iqgs.yaml')
    iqgs.each do |iqg|
      new_iqg = IntervalQuestionGenerator.find_or_create_by(slug: iqg['slug']) do |i|
        i.parameters = iqg['params']
        i.name = iqg['name']
      end
      new_iqg.update(parameters: iqg['params'])
      new_iqg.update(name: iqg['name'])
    end
  end
  task reset_skills: :environment do
    skills = YAML.load_file('lib/seeds/skills.yaml')
    Skill.delete_all
    skills.each do |skill|
      new_skill = Skill.create do |s|
        s.name = skill['name']
        s.slug = skill['slug']
      end      
      skill['qg'].each_with_index do |qg, index|
        question_generator = QuestionGenerator.find_by(slug: qg)
        question_generator.update(skill: new_skill)
        question_generator.update(order: index)
      end
    end
  end
  task reset_tree: :environment do
    Tree.delete_all
    tree = CSV.read('lib/seeds/tree.csv')
    tree.each_with_index do |branch, level|
      branch.each_with_index do |leaf, order|
        t = Tree.create(level: level, order: order)
        skill = Skill.find_by(slug: leaf)
        skill.update(tree: t)
      end
    end
    
  end
  task update: [:add_new_and_update_iqgs, :reset_skills, :reset_tree]
end
