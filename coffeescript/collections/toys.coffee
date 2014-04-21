App = require '../app'

require '../models/toy'

App.Collections.Toys = Backbone.Collection.extend
	url: '/api/toys'
	model: App.Models.Toy