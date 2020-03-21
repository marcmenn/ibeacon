import { bucket } from '../../../src/database/backend/couchbase/index.js'

describe('upsert', () => {
  it('should upsert document', async () => {
    await bucket().defaultCollection().upsert('a', { b: 'c' })
  })
})
