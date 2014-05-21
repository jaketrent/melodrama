const config = require('config')
const debug = require('debug')('mel:app')
const express = require('express')
const path = require('path')

const routes = require('./config/routes')

const app = express()

app.set('port', config.port)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use('/static', require('./common/middleware/mincer').server)

routes.map(app)

app.listen(app.get('port'), function () {
  debug('Starting the melodrama on port %s (%s)', app.get('port'), app.get('env'))
})