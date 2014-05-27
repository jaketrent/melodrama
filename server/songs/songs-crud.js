'use strict'

const config = require('config')
const debug = require('debug')('mel:songs:crud')
const superagent = require('superagent')
const util = require('util')
const _ = require('lodash')

const fromDatumToModel = require('./transforms/from-datum-to-model')

const agent = superagent.agent()

exports.index = function (done) {

  const indexUrl = config.url.index
  debug('Requesting index: %s', indexUrl)
  agent
    .get(indexUrl)
    .set('Content-Type', 'application/json')
    .end(function (res) {

      let langColl = _.find(res.body.languages, function (coll) {
        return coll.languageCode == config.lang
      })

      let songColl = _.find(langColl.collections, function (coll) {
        return coll.id == config.collection
      })

      const collectionUrl = util.format(config.url.collection, songColl.version)
      debug('Requesting collection: %s', collectionUrl)
      agent
        .get(collectionUrl)
        .set('Content-Type', 'application/json')
        .end(function (res) {
          done(null, res.body.items.map(fromDatumToModel))
        })
    })
}