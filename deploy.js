const ghpages = require('gh-pages')

console.log('start publish...')
ghpages.publish('dist', {
  add: false
}, function () {
  console.log('finished')
})
