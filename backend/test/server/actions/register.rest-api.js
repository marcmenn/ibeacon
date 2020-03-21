import request from 'supertest'
import HttpStatus from 'http-status-codes'
import chai from 'chai'

import { getTestHost, withTestServer } from '../../test-api/with-test-server.js'

const { expect } = chai

describe('POST /api/device/:deviceId (register event)', () => {
  withTestServer()

  it('should return `registered` message', async () => {
    const { body } = await request(getTestHost())
      .post('/api/device/deviceIdA')
      .send({
        beaconId: 'beaconIdB',
        timestamp: '2020-03-21T11:48:01.510Z',
      })
      .expect(HttpStatus.OK)

    expect(body).to.deep.equal({
      message: 'registered',
      deviceId: 'deviceIdA',
      beaconId: 'beaconIdB',
      timestamp: '2020-03-21T11:48:01.510Z',
    })
  })
})
