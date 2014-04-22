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
					<a class="go_to_toy" href="/#toy/<%= toy.get('id') %>">
						<img src="<%= toy.get('photos')[0] %>" class="thumb">
					</a>
					<header class="header">
						<h3 class="name">
							<a class="go_to_toy" href="/#toy/<%= toy.get('id') %>">
								<%= toy.get('name') %>
							</a>
						</h3>
						<% if (toy.get('price')) {%>
							<h4 class="price">£<%= toy.get('price').toFixed(2) %></h4>
						<% } %>
					</header>
					<a class="view-details" href="/#toy/<%= toy.get('id') %>">View Details</a>
					<div class='description'>
						<% if (toy.get('description').length > 100) { %>
							<%= toy.get('description').substring(0, 99) %>...
						<% } %>
					</div>
				</li>
			<% }); %>
		</ol>
		<a href="/#categories">View all categories</a>
		"""

	render: ->
		@$el.html @template()