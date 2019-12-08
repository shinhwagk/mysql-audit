require 'webrick'
require 'net/http'
require 'json'

uri = URI('https://myapp.com/api/v1/resource')
req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
req.body = {param1: 'some value', param2: 'some other value'}.to_json
res = Net::HTTP.start(uri.hostname, uri.port) do |http|
  http.request(req)
end

def create_agent
    uri = URI('http://api.nsa.gov:1337/agent')
    http = Net::HTTP.new(uri.host, uri.port)
    req = Net::HTTP::Post.new(uri.path, 'Content-Type' => 'application/json')
    req.body = {name: 'John Doe', role: 'agent'}.to_json
    res = http.request(req)
    puts "response #{res.body}"
rescue => e
    puts "failed #{e}"
end

response = http.request_post('/cgi-bin/nice.rb', 'datadatadata...')
server = WEBrick::HTTPServer.new(:Port => ARGV.first)
server.mount_proc '/' do |req, res|
  puts req.body
end

trap 'INT' do
  server.shutdown
end
puts "abc"
server.start