task init_app: :environment do
  Rake::Task['init_db:reset'].invoke
  Rake::Task['tree:update'].invoke
end
