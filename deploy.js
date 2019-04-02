const ghpages = require('gh-pages')

ghpages.publish('dist', {
  add: false
}, function () {
  console.log('finished')
})
