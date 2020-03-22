import request from 'supertest'
import HttpStatus from 'http-status-codes'
import chai from 'chai'

import { EVENT_TYPE } from '../../../src/api/event-type.js'

import { getTestHost } from '../../test-api/setup.rest-api.js'

import { register } from './register.rest-api.js'

const { expect } = chai

const deviceId = 'deviceIdA'
const beaconId = 'beaconIdB'
const contactedBeaconId = 'beaconIdC'
const timestamp = '2020-03-21T11:48:01.510Z'

describe('POST /api/device/:deviceId/contact (contact event)', () => {
  before(async () => {
    register(deviceId, beaconId, timestamp)
  })

  it('should return `received` message', async () => {
    const { body } = await request(getTestHost())
      .post(`/api/device/${deviceId}/contact`)
      .send({
        beaconId,
        contactedBeaconId,
        timestamp,
        distance: 1.1,
      })
      .expect(HttpStatus.OK)

    expect(body).to.deep.include({
      type: EVENT_TYPE.CONTACT,
      deviceId,
      payload: {
        timestamp,
        beaconId,
        contactedBeaconId,
        distance: 1.1,
      },
    })
  })
})
