#!/usr/bin/env node
global.Promise = require('bluebird')
require('better-log/install')
require('babel-register')
require('thinky-loader').initialize({
  debug: false,
  modelsPath: require('path').join(__dirname, './src/models'),
  thinky: {
    rethinkdb: require('./src/config').rethinkdb
  }
}).then(() => {
  console.info('RethinkDB connected')
  require('./src')
}, (error) => {
  console.error('Thinky loader initialize error: ', error.message)
  process.exit(1)
})
