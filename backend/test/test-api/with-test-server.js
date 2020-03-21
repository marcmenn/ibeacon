import http from 'http'
import mocha from 'mocha'

import createApp from '../../src/server/server.js'
import '../couchbase.rest-api.js'

const { before, after } = mocha
const port = 3030

const getTestHost = () => `http://localhost:${port}`

const withTestServer = () => {
  let testServer

  before(async () => {
    testServer = http.createServer(createApp())
    await new Promise((resolve) => testServer.listen(port, resolve))
  })

  after(async () => {
    if (testServer) {
      await new Promise((resolve) => testServer.close(resolve))
    }

    testServer = undefined
  })
}

export {
  getTestHost,
  withTestServer,
}
