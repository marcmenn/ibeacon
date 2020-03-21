import mocha from 'mocha'
import { bucket, connect, close } from '../../src/database/backend/couchbase/index.js'

const { after, before } = mocha

after('Closing couchbase connection', close)

before('Connecting to couchbase', async function connectCouchbase() {
  this.timeout(10000)
  bucket()
  await connect().buckets().getAllBuckets()
})
