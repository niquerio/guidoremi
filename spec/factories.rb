FactoryGirl.define do
  sequence :email do |n|
    "person#{n}@example.com"
  end
  params = { prompt: 'What is the Answer' }
  factory :interval_question_generator do
    name 'name'
    parameters params
  end
  factory :choice do
    multiple_choice_question
  end
  factory :multiple_choice_question do
    question_generator
  end
  factory :question_generator do
    name 'MyString'
    parameters 'MyText'
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
