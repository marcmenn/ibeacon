import request from 'supertest'
import HttpStatus from 'http-status-codes'
import chai from 'chai'

import { EVENT_TYPE } from '../../../src/api/event-type.js'

import { getTestHost } from '../../test-api/setup.rest-api.js'

const { expect } = chai

export const register = (deviceId, beaconId, timestamp) => request(getTestHost())
  .post(`/api/device/${deviceId}`)
  .send({
    beaconId,
    timestamp,
  })

describe('POST /api/device/:deviceId (register event)', () => {
  it('should return `registered` message', async () => {
    const { body } = await register('deviceIdA', 'beaconIdB', '2020-03-21T11:48:01.510Z')
      .expect(HttpStatus.OK)

    expect(body).to.deep.include({
      type: EVENT_TYPE.REGISTER,
      deviceId: 'deviceIdA',
      payload: {
        beaconId: 'beaconIdB',
        timestamp: '2020-03-21T11:48:01.510Z',
      },
    })
  })
})
