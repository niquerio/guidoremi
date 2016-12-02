FactoryGirl.define do
  factory :score do
    question_generator 
    user 
    complete false
    current_streak 0
    highest_streak 0
  end
  factory :tree do
    level 1
    skill
  end
  factory :skill do
    name "So-Mi"
    slug 'slug'
  end
  sequence :email do |n|
    "person#{n}@example.com"
  end
  params = { prompt: 'What is the Answer' }
  factory :interval_question_generator do
    slug 'slug'
    name 'name'
    parameters params
    skill
  end
  factory :choice do
    multiple_choice_question
  end
  factory :multiple_choice_question do
    question_generator
  end
  factory :question_generator do
    slug 'slug'
    name 'MyString'
    parameters 'MyText'
    skill
  end
  factory :user do
    email { generate(:email) }
    password 'password'
  end
  factory :answer do
    user
    association :question, factory: :multiple_choice_question
  end
end
