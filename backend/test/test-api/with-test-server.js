import http from 'http'
import mocha from 'mocha'

import { connect, setBucketName } from '../../src/database/backend/couchbase/index.js'
import createApp from '../../src/server/server.js'
import './with-couchbase.js'

const { before, after } = mocha
const port = 3030
const bucketName = 'test'

setBucketName(bucketName)

const { REST_URL } = process.env

const getTestHost = () => REST_URL || `http://localhost:${port}`

before('flush bucket', async function flushBucket() {
  this.timeout(10000)
  await connect().buckets().flushBucket(bucketName)
})

if (!REST_URL) {
  let testServer

  before('start server', async () => {
    testServer = http.createServer(createApp())
    await new Promise((resolve) => testServer.listen(port, resolve))
  })

  after('stop server', async () => {
    if (testServer) {
      await new Promise((resolve) => testServer.close(resolve))
    }

    testServer = undefined
  })
}

export {
  getTestHost,
}
