'use strict'

const config = require('config')

exports.index = function (req, res) {
  res.render('index', {
    assets: config.assets
  })
}

exports.test = function (req, res) {
  res.render('test')
}