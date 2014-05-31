'use strict'

const config = require('config')
const debug = require('debug')('mel:songs:crud')
const RSVP = require('rsvp')
const superagent = require('superagent')
const util = require('util')
const _ = require('lodash')

const fromDatumToModel = require('./transforms/from-datum-to-model')

const agent = superagent.agent()

var songsCache = null

exports.index = function (done) {
  if (songsCache)
    return done(null, songsCache)

  const indexUrl = config.url.index
  debug('Requesting index: %s', indexUrl)
  agent
    .get(indexUrl)
    .set('Content-Type', 'application/json')
    .end(function (res) {

      let langColl = _.find(res.body.languages, function (coll) {
        return coll.languageCode == config.lang
      })

      let songColls = langColl.collections.filter(function (coll) {
        return config.collections.indexOf(coll.id) > -1
      })

      let promises = songColls.map(function (coll) {
        return new RSVP.Promise(function (resolve, reject) {
          let collectionUrl = util.format(config.url.collection, coll.id, coll.version)
          debug('Requesting collection: %s', collectionUrl)
          agent
            .get(collectionUrl)
            .set('Content-Type', 'application/json')
            .end(function (res) {
              resolve(res.body.items.map(fromDatumToModel))
            })
        })
      })

      RSVP.all(promises).then(function (results) {
        let allSongsWithMp3s = _.flatten(results)
          .filter(function (song) {
            return song.mp3
          })

        songsCache = allSongsWithMp3s

        done(null, allSongsWithMp3s)
      })

    })
}