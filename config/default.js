module.exports = {

  assets: {
    baseUrl: 'http://localhost:4200',
    cssPath: '/css/style.css',
    jsPath: '/js/dist.js'
  },

  collection: 'Childrens-EN',

  lang: 'en',

  port: process.env.PORT || 3000,

  url: {
    index: 'http://broadcast3.lds.org/crowdsource/Mobile/LDSMusic/Staging/Metadata/9/Index.json',
    collection: 'http://broadcast3.lds.org/crowdsource/Mobile/LDSMusic/Staging/Collections/Childrens-EN/%s/Collection.json'
  }

}