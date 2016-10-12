FactoryGirl.define do
  factory :skill do
    name "So-Mi"
    tree
  end
  factory :tree do
    level 1
    order 1
  end
  sequence :email do |n|
    "person#{n}@example.com"
  end
  params = { prompt: 'What is the Answer' }
  factory :interval_question_generator do
    slug 'slug'
    name 'name'
    parameters params
    order 1
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
    order 1
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
