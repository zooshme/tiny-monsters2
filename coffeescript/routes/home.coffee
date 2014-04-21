App = require '../app'

App.Views.Home = Backbone.View.extend
	tagName: 'div'
	id: 'home-view'
	initialize: ->
		$('.content .inner').html this.el
		#console.log @collection.models
		@render()
	# events: 
	# 	'click .go_to_toy': 'go_to_toy'

	# go_to_toy: (ev) ->
	# 	ev.preventDefault()
	# 	App.Router.navigate('toy/' + $(ev.target).attr('href'), {trigger: true})
	# 	return false

	template: _.template """
		<h2>Special Offers</h2>
		<ol class="row toys">
			<% this.collection.each(function(toy) { %>
				<li class="d-col1of4 toy">
					<img src="<%= toy.get('photos')[0] %>" class="thumb">
					<h3>
						<a class="go_to_toy" href="/#toy/<%= toy.get('id') %>">
							<%= toy.get('name') %>
						</a>
					</h3>
					<div class='description'>
						
						<% if (toy.get('description').length > 100) { %>
							<%= toy.get('description').substring(0, 99) %>...
						<% } %>
					</div>
				</li>
			<% }); %>
		</ol>
		"""

	render: ->
		@$el.html @template()

App.Router.on 'route:home', ->
	route = @
	toysCollection = new App.Collections.Toys()
	
	toysCollection.fetch().then (toys) ->
		route.view = new App.Views.Home
			collection: toysCollection