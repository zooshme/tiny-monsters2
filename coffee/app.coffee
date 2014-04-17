Toy = Backbone.Model.extend
	url: '/api/toy'

ToyCollection = Backbone.Collection.extend
	url: '/api/toylist'
	model: Toy


Router = Backbone.Router.extend
	routes:
		'': 'home'

router = new Router()

toyCollection = new ToyCollection()


router.on 'route:home', -> 
	console.log(toyCollection.fetch())
	this.view = new HomeView()

HomeView = Backbone.View.extend
	tagName: 'div'
	id: 'home-view'
	initialize: ->
		$('body').html this.el
		this.render()

	render: ->
		this.$el.html 'Hello everybody'

toyCollectionView = Backbone.View.extend
	template: _.template ''
	render: ->
		this.$el.html this.template this.model.attributes
		return this


Backbone.history.start()