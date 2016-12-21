namespace :start do
  task :both do
    exec 'foreman start -p 3000'
  end
  task :client do
    Dir.chdir('client'){ |p|
      exec 'npm start --host 192.168.56.101'
    }
  end
  task :api do
    exec 'bundle exec rails s -p 3001 -b 192.168.56.101'
  end
end
