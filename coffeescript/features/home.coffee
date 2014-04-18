App.Views.Home = Backbone.View.extend
	tagName: 'div'
	id: 'home-view'
	initialize: ->
		$('body').html this.el
		@render()

	toy: toyView

	template: _.template """
		<h1>Hello</h1>
		<ol>
			<% _.each(this.collection.models, function(toy) { %>
				
			<% }); %>
		</ol>
		"""

	render: ->
		@$el.html @template()