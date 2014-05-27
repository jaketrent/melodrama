App = Ember.Application.create()

App.ApplicationAdapter = DS.RESTAdapter.reopen({
  namespace: 'api/v1',
  pathForType: function(type) {
    var dasherized = Ember.String.dasherize(type)
    return Ember.String.pluralize(dasherized)
  }
})

App.Store = DS.Store.extend({
  adapter: App.ApplicationAdapter
})

App.Song = DS.Model.extend({
  title: DS.attr('string'),
  number: DS.attr('string'),
  mp3: DS.attr('string')
})

App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('song')
  }
})