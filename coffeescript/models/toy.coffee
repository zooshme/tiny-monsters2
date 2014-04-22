App = require '../app'

App.Models.Toy = Backbone.RelationalModel.extend
	url: -> 
		return '/api/toys'
	relations: [{
			type: 'HasOne'
			key: 'category'
			relatedModel: App.Models.Category
		}]

module.exports = App.Models.Toy
