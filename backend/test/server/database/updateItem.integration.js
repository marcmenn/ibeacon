import { collection } from '../../../src/database/couchbase.js'

describe('upsert', () => {
  it('should upsert document', async () => {
    await collection().upsert('a', { b: 'c' })
  })
})
