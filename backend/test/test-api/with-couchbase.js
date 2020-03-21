import mocha from 'mocha'
import { bucket, connect, close, setBucketName } from '../../src/database/backend/couchbase/index.js'

const { after, before } = mocha

const bucketName = 'test'

setBucketName(bucketName)

before('Connecting to couchbase', async function connectCouchbase() {
  this.timeout(10000)
  bucket()
  await connect().buckets().getAllBuckets()
})

before('flush bucket', async function flushBucket() {
  this.timeout(10000)
  await connect().buckets().flushBucket(bucketName)
})

after('Closing couchbase connection', close)
