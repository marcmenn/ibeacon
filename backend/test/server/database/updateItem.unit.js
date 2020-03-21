import { CouchbaseDatabaseBackend } from '../../../src/database/backend/couchbase/index.js'
import '../../test-api/with-couchbase.js'

describe('upsert', () => {
  let couchbase = null

  before(() => {
    couchbase = new CouchbaseDatabaseBackend()
  })

  it('should upsert document', async () => {
    await couchbase.setItem('type', 'a', { b: 'c' })
  })
})
