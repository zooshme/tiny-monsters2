(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, Router;

Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'toy/:id': 'toy'
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

require('../models/toy');

App.Collections.Toys = Backbone.Collection.extend({
  url: '/api/toys',
  model: App.Models.Toy
});


},{"../app":1,"../models/toy":3}],3:[function(require,module,exports){
var App;

App = require('../app');

App.Models.Toy = Backbone.Model.extend({
  url: function() {
    return '/api/toy/' + this.id;
  }
});

module.exports = App.Models.Toy;


},{"../app":1}],4:[function(require,module,exports){
var App;

App = require('../app');

App.Views.Home = Backbone.View.extend({
  tagName: 'div',
  id: 'home-view',
  initialize: function() {
    $('.content .inner').html(this.el);
    return this.render();
  },
  template: _.template("<h2>Special Offers</h2>\n<ol class=\"row toys\">\n	<% this.collection.each(function(toy) { %>\n		<li class=\"d-col1of4 toy\">\n			<img src=\"<%= toy.get('photos')[0] %>\" class=\"thumb\">\n			<h3>\n				<a class=\"go_to_toy\" href=\"/#toy/<%= toy.get('id') %>\">\n					<%= toy.get('name') %>\n				</a>\n			</h3>\n			<div class='description'>\n				\n				<% if (toy.get('description').length > 100) { %>\n					<%= toy.get('description').substring(0, 99) %>...\n				<% } %>\n			</div>\n		</li>\n	<% }); %>\n</ol>"),
  render: function() {
    return this.$el.html(this.template());
  }
});

App.Router.on('route:home', function() {
  var route, toysCollection;
  route = this;
  toysCollection = new App.Collections.Toys();
  return toysCollection.fetch().then(function(toys) {
    return route.view = new App.Views.Home({
      collection: toysCollection
    });
  });
});


},{"../app":1}],5:[function(require,module,exports){
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
  toyModel = new App.Models.Toy({
    id: id
  });
  return toyModel.fetch().then(function(toy) {
    return route.view = new App.Views.Toy({
      model: toyModel
    });
  });
});


},{"../app":1,"../models/toy":3}],6:[function(require,module,exports){
require('./models/toy');

require('./collections/toys');

require('./routes/home');

require('./routes/toy');

Backbone.history.start();


},{"./collections/toys":2,"./models/toy":3,"./routes/home":4,"./routes/toy":5}]},{},[6])