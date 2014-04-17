(function() {
  var HomeView, Router, Toy, ToyCollection, router, toyCollection, toyCollectionView;

  Toy = Backbone.Model.extend({
    url: '/api/toy'
  });

  ToyCollection = Backbone.Collection.extend({
    url: '/api/toylist',
    model: Toy
  });

  Router = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });

  router = new Router();

  toyCollection = new ToyCollection();

  router.on('route:home', function() {
    console.log(toyCollection.fetch());
    return this.view = new HomeView();
  });

  HomeView = Backbone.View.extend({
    tagName: 'div',
    id: 'home-view',
    initialize: function() {
      $('body').html(this.el);
      return this.render();
    },
    render: function() {
      return this.$el.html('Hello everybody');
    }
  });

  toyCollectionView = Backbone.View.extend({
    template: _.template(''),
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  Backbone.history.start();

}).call(this);
