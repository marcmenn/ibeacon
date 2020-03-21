import { bucket } from '../../../src/database/couchbase.js'

describe('upsert', () => {
  it('should upsert document', async () => {
    await bucket().defaultCollection().upsert('a', { b: 'c' })
  })
})
