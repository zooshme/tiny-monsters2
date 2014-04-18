App.Models.Toy = Backbone.Model.extend
	url: '/api/toy'


App.Views.Toy = Backbone.View.extend
	tagName: 'li'
	template: _.template """
		<li>
			Helloooooa
			<h3><%= model.get('name') %></h3>
			<div class='description'><%= model.get('description') %></div>
		</li>
		"""