App = require '../app'

App.Models.Category = Backbone.RelationalModel.extend
	url: ->
		return '/api/category/' + @id

module.exports = App.Models.Category