App = require '../app'

App.Models.Toy = Backbone.Model.extend
	url: -> 
		return '/api/toy/' + @id

module.exports = App.Models.Toy
