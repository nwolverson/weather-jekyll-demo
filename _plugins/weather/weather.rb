module Weather
  class Generator < Jekyll::Generator
    def generate(site)
        site.posts.each do |post| 
            date = post.date.strftime("%Y%m%d")
            file = "weather/"+date+".svg"
            Dir.chdir("_plugins/weather") do
                relativeFile = "../../_includes/" + file
                if (! (File.exist?(relativeFile)) )
                    system("phantomjs", "generate.js", date, relativeFile);
                end
            end
            post.data['weather_svg'] = file
        end
    end
  end
end