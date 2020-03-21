import request from 'supertest'
import HttpStatus from 'http-status-codes'
import chai from 'chai'

import { getTestHost, withTestServer } from '../../test-api/with-test-server.js'

const { expect } = chai

describe('GET /api/register', () => {
  withTestServer()

  it('should return registration string', async () => {
    const { body } = await request(getTestHost())
      .post('/api/device/deviceIdA')
      .send({
        beaconId: 'beaconIdB',
        timestamp: '2020-03-21T11:48:01.510Z',
      })
      .expect(HttpStatus.OK)

    expect(body).to.equal('registered deviceIdA/beaconIdB')
  })
})
