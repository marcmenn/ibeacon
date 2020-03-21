import request from 'supertest'
import HttpStatus from 'http-status-codes'
import chai from 'chai'

import { getVersion } from '../../../src/get-version.js'

import { getTestHost } from '../../test-api/setup.rest-api.js'

const { expect } = chai

describe('GET /api', () => {
  it('should return name and version', async () => {
    const { body } = await request(getTestHost())
      .get('/api')
      .expect(HttpStatus.OK)

    // ignore keys couchbase and buckets as they contain runtime diagnostics
    body.couchbase = null
    body.buckets = null

    expect(body).to.deep.equal({
      name: 'ibeacon API',
      version: getVersion(),
      couchbase: null,
      buckets: null,
    })
  })
})
