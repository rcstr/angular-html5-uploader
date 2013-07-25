#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require 'json'
require 'rack/cors'


use Rack::Cors do |config|
  config.allow do |allow|
    allow.origins '*'
    allow.resource '*',
      :methods => [:get, :post, :put, :delete, :options],
      :headers => :any

  end
end

set :protection, :except => :json_csrf

get '/' do

end

post '/image' do
  	
  rand = Time.now.to_i

	File.open("public/uploads/#{rand}" + params['file'][:filename], "w") do |f|
		f.write(params['file'][:tempfile].read)
	end

	content_type :json
	{ :image => "#{request.base_url}/uploads/#{rand}" + params['file'][:filename], :token => params[:token] }.to_json

end