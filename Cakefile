fs = require 'fs'
coffee = require 'coffee-script'

task 'build', 'build it', () ->
	fs.readdir './src/', (e1, l) ->
		unless e1
			c = ""
			l.forEach (v)->
				c = c + fs.readFileSync './src/' + v, 'utf8'
			fs.writeFile './dist/leaflet.hash.js', coffee.compile c
			console.log "built"
			
			