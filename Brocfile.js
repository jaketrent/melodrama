var mergeTrees = require('broccoli-merge-trees')

var concat = require('broccoli-concat')
var emblem = require('broccoli-ember-emblem')
var pickFiles = require('broccoli-static-compiler')
var stylus = require('broccoli-stylus')

function preprocess (tree) {
  tree = emblem(tree, {
    stripPathFromName: 'tmpl/'
  })
  tree = stylus(tree)
  return tree
}

function postprocess(trees) {
  var newTree = mergeTrees.call(this, Array.prototype.slice.call(arguments))
  return concat(newTree, {
    inputFiles: [
      'js/bower_components/jquery/jquery.js',
      'js/bower_components/handlebars/handlebars.js',
      'js/bower_components/ember/ember.js',
      'js/bower_components/ember-data/ember-data.js',
      'js/lib/client.js',
      'js/lib/**/*.js',
      'tmpl/**/*.js'
    ],
    outputFile: '/js/dist.js'
  })
}

var jsTree = 'client/js'
jsTree = pickFiles(jsTree, {
  srcDir: '/',
  destDir: '/js'
})
jsTree = preprocess(jsTree)

var tmplTree = 'client/tmpl'
tmplTree = pickFiles(tmplTree, {
  srcDir: '/',
  destDir: '/tmpl'
})
tmplTree = preprocess(tmplTree)

var cssTree = 'client/css'
cssTree = pickFiles(cssTree, {
  srcDir: '/',
  destDir: '/css'
})
cssTree = preprocess(cssTree)

var scriptTree = postprocess(jsTree, tmplTree)

module.exports = mergeTrees([ scriptTree, cssTree ])