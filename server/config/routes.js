'use strict'

const index = require('../common/controllers/index')
const songs = require('../songs/songs-ctrl')

exports.map = function (app) {
  app.get('/', index.index)
  app.get('/test', index.test)
  app.get('/api/v1/songs', songs.index)
}