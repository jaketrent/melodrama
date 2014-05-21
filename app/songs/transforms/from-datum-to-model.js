
module.exports = function (datum) {
  const json = {
    title: datum.name,
    number: datum.number
  }

  if (datum.counterparts && datum.counterparts.vocalMP3) {
    json.mp3 = datum.counterparts.vocalMP3.url
  }

  return json
}