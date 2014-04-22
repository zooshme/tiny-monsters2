App = require '../app'

App.Router.on 'route:home', ->
	route = @
	toysCollection = new App.Collections.Toys()
	
	toysCollection.fetch(data: {featured: true}).then (toys) ->
		route.view = new App.Views.Home
			collection: toysCollection