Router = Backbone.Router.extend
	routes:
		'' : 'home'
		'toy/:id': 'toy'
		'categories': 'categories'

App =
	Models: {},
	Views: {},
	Collections: {},
	Routes: {},
	Config: {},
	Router: new Router()


module.exports = App