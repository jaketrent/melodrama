
const crud = require('./songs-crud')
const fromModelsToJson = require('./transforms/from-models-to-json')

exports.index = function (req, res) {
  crud.index(function (err, songs) {
    if (err) return res.json(500, err)

    res.json(200, fromModelsToJson(songs))
  })
}