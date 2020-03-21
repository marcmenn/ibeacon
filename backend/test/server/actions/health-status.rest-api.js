import request from 'supertest'
import HttpStatus from 'http-status-codes'
import chai from 'chai'

import { getTestHost } from '../../test-api/setup.rest-api.js'

const { expect } = chai

describe('POST /api/device/:deviceId/health-state (health-state event)', () => {
  it('should return `received` message', async () => {
    const { body } = await request(getTestHost())
      .post('/api/device/deviceIdA/health-state')
      .send({
        timestamp: '2020-03-21T11:48:01.510Z',
        healthState: 'healthy',
      })
      .expect(HttpStatus.OK)

    expect(body).to.deep.equal({
      message: 'received',
      deviceId: 'deviceIdA',
      timestamp: '2020-03-21T11:48:01.510Z',
      healthState: 'healthy',
    })
  })
})
