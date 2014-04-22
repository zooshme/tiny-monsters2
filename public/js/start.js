(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, Router;

Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'toy/:id': 'toy',
    'categories': 'categories'
  }
});

App = {
  Models: {},
  Views: {},
  Collections: {},
  Routes: {},
  Config: {},
  Router: new Router()
};

module.exports = App;


},{}],2:[function(require,module,exports){
var App;

App = require('../app');

App.Collections.Categories = Backbone.Collection.extend({
  url: '/api/categories',
  model: App.Models.Category
});

module.exports = App.Collections.Categories;


},{"../app":1}],3:[function(require,module,exports){
var App;

App = require('../app');

App.Collections.Toys = Backbone.Collection.extend({
  url: '/api/toys',
  model: App.Models.Toy
});

module.exports = App.Collections.Toys;


},{"../app":1}],4:[function(require,module,exports){
var App;

App = require('../app');

App.Models.Category = Backbone.RelationalModel.extend({
  url: function() {
    return '/api/category/' + this.id;
  }
});

module.exports = App.Models.Category;


},{"../app":1}],5:[function(require,module,exports){
var App;

App = require('../app');

App.Models.Toy = Backbone.RelationalModel.extend({
  url: function() {
    return '/api/toys';
  },
  relations: [
    {
      type: 'HasOne',
      key: 'category',
      relatedModel: App.Models.Category
    }
  ]
});

module.exports = App.Models.Toy;


},{"../app":1}],6:[function(require,module,exports){
var App;

App = require('../app');

App.Router.on('route:categories', function() {
  var CategoriesCollection, route;
  route = this;
  CategoriesCollection = new App.Collections.Categories();
  return CategoriesCollection.fetch().then(function(categories) {
    return route.view = new App.Views.Categories({
      collection: CategoriesCollection
    });
  });
});


},{"../app":1}],7:[function(require,module,exports){
var App;

App = require('../app');

App.Router.on('route:home', function() {
  var route, toysCollection;
  route = this;
  toysCollection = new App.Collections.Toys();
  return toysCollection.fetch({
    data: {
      featured: true
    }
  }).then(function(toys) {
    return route.view = new App.Views.Home({
      collection: toysCollection
    });
  });
});


},{"../app":1}],8:[function(require,module,exports){
var App;

App = require('../app');

require('../models/toy');

App.Views.Toy = Backbone.View.extend({
  tagName: 'div',
  id: 'toy-view',
  initialize: function() {
    console.log('Hello');
    $('.content .inner').html(this.el);
    return this.render();
  },
  template: _.template("<h2><%= this.model.get('name') %></h2>\n<div class=\"description\">\n	<%= this.model.get('description') %>\n</div>"),
  render: function() {
    return this.$el.html(this.template());
  }
});

App.Router.on('route:toy', function(id) {
  var route, toyModel;
  console.log(id);
  route = this;
  toyModel = App.Models.Toy.find({
    id: id
  });
  if (toyModel) {
    return route.view = new App.Views.Toy({
      model: toyModel
    });
  } else {
    toyModel = new App.Models.Toy();
    return toyModel.fetch({
      data: {
        id: id
      }
    }).then(function(toy) {
      return route.view = new App.Views.Toy({
        model: toyModel
      });
    });
  }
});


},{"../app":1,"../models/toy":5}],9:[function(require,module,exports){
require('./models/category');

require('./models/toy');

require('./collections/toys');

require('./collections/categories');

require('./routes/home');

require('./routes/toy');

require('./routes/categories');

require('./views/home');

require('./views/categories');

Backbone.history.start();


},{"./collections/categories":2,"./collections/toys":3,"./models/category":4,"./models/toy":5,"./routes/categories":6,"./routes/home":7,"./routes/toy":8,"./views/categories":10,"./views/home":11}],10:[function(require,module,exports){
var App;

App = require('../app');

App.Views.Categories = Backbone.View.extend({
  tagName: 'div',
  id: 'categories-view',
  initialize: function() {
    $('.content .inner').html(this.el);
    return this.render();
  },
  template: _.template("<h2>Categories</h2>\n"),
  render: function() {
    return this.$el.html(this.template());
  }
});


},{"../app":1}],11:[function(require,module,exports){
var App;

App = require('../app');

App.Views.Home = Backbone.View.extend({
  tagName: 'div',
  id: 'home-view',
  initialize: function() {
    $('.content .inner').html(this.el);
    return this.render();
  },
  template: _.template("<h2>Special Offers</h2>\n<ol class=\"row toys\">\n	<% this.collection.each(function(toy) { %>\n		<li class=\"d-col1of4 toy\">\n			<a class=\"go_to_toy\" href=\"/#toy/<%= toy.get('id') %>\">\n				<img src=\"<%= toy.get('photos')[0] %>\" class=\"thumb\">\n			</a>\n			<header class=\"header\">\n				<h3 class=\"name\">\n					<a class=\"go_to_toy\" href=\"/#toy/<%= toy.get('id') %>\">\n						<%= toy.get('name') %>\n					</a>\n				</h3>\n				<% if (toy.get('price')) {%>\n					<h4 class=\"price\">£<%= toy.get('price').toFixed(2) %></h4>\n				<% } %>\n			</header>\n			<a class=\"view-details\" href=\"/#toy/<%= toy.get('id') %>\">View Details</a>\n			<div class='description'>\n				<% if (toy.get('description').length > 100) { %>\n					<%= toy.get('description').substring(0, 99) %>...\n				<% } %>\n			</div>\n		</li>\n	<% }); %>\n</ol>\n<a href=\"/#categories\">View all categories</a>"),
  render: function() {
    return this.$el.html(this.template());
  }
});


},{"../app":1}]},{},[9])