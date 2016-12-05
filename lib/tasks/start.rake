namespace :start do
  task :both do
    exec 'foreman start -p 3000'
  end
  task :client do
    Dir.chdir('client'){ |p|
      exec 'npm start --host 192.168.0.105'
    }
  end
  task :api do
    exec 'bundle exec rails s -p 3001 -b 192.168.0.105'
  end
end
