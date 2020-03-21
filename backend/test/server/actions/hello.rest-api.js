import request from 'supertest'
import HttpStatus from 'http-status-codes'
import chai from 'chai'

import { getVersion } from '../../../src/get-version.js'

import { getTestHost, withTestServer } from '../../test-api/with-test-server.js'

const { expect } = chai

describe('GET /api', () => {
  withTestServer()

  it('should return name and version', async () => {
    const { body } = await request(getTestHost())
      .get('/api')
      .expect(HttpStatus.OK)

    expect(body).to.deep.equal({
      name: 'ibeacon API',
      version: getVersion(),
    })
  })
})
