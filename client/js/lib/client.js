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

App.ApplicationController = Ember.ArrayController.extend({

  initAudio: function () {
    this.audio = new Audio()
    this.currentSong = null
    this.audio.addEventListener('ended', this.playNextSong.bind(this))
  }.on('init'),

  playNextSong: function () {
    var songs = this.get('model')
    console.log('songs')
    console.log(songs)

    var nextIndx = songs.indexOf(this.currentSong) + 1

    if (nextIndx >= songs.length)
      nextIndx = 0

    this.currentSong = songs.objectAt(nextIndx)

    this.play()
  },

  play: function () {
    this.audio.src = this.currentSong.get('mp3')
    this.audio.play()
  },

  actions: {
    playSong: function (song) {
      console.log('playSong')
      this.currentSong = song
      this.play()
    },
    stopSong: function () {
      this.audio.pause()
    }
  }
})

App.SongItemComponent = Ember.Component.extend({
  tagName: 'li',
  classNames: ['song-item'],
  classNameBindings: ['isPlaying'],
  play: 'playSong',
  stop: 'stopSong',
  isPlaying: false,
  actions: {
    togglePlay: function () {
      if (this.get('isPlaying')) {
        this.sendAction('stop')
      } else {
        this.sendAction('play', this.get('song'))
      }
      this.toggleProperty('isPlaying')
    }
  }
})