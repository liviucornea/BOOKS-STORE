var canned = require('canned')
  ,   http = require('http')
  ,   opts = { logger: process.stdout }

can = canned('./mocks', opts)

http.createServer(can).listen(process.env.PORT || 8800)
