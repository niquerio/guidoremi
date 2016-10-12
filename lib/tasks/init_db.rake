namespace :init_db do
  task reset: :environment do
    Rake::Task['db:reset'].invoke
    Rake::Task['db:migrate'].invoke
    Rake::Task['db:seed'].invoke
  end
end
