'use strict'

const debug = require('debug')('mel:mincer')
const Mincer = require('mincer')
const nib = require('nib')
const path = require('path')

Mincer.StylusEngine.configure(function (style) {
  style.use(nib())
})

const environment = new Mincer.Environment()

Mincer.logger.use({
  log: function (level, msg) {
    debug('MINCER: ' + level + ': ' + msg)
  }
})

environment.appendPath(path.join(__dirname, '..', '..', 'static'))
environment.appendPath(path.join(__dirname, '..', '..', '..', 'bower_components'))

exports.server = Mincer.createServer(environment)