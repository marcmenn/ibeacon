import request from 'supertest'
import HttpStatus from 'http-status-codes'
import chai from 'chai'

import { HEALTH_STATUS } from '../../../src/api/health-status.js'

import { getTestHost, withTestServer } from '../../test-api/with-test-server.js'

const { expect } = chai
const { HEALTHY, SICK } = HEALTH_STATUS

describe('GET /api/device/:deviceId/contact (contact report)', () => {
  withTestServer()

  it('should return all contacts', async () => {
    const { body } = await request(getTestHost())
      .get('/api/device/deviceIdA/contact')
      .expect(HttpStatus.OK)

    expect(body).to.deep.equal({
      contacts: [
        { timestamp: '2020-03-21T11:48:01.510Z', healthStatus: HEALTHY, distance: 1.1, duration: 23 },
        { timestamp: '2020-03-21T10:48:01.510Z', healthStatus: SICK, distance: 0.3, duration: 54 },
        { timestamp: '2020-03-21T09:48:01.510Z', healthStatus: HEALTHY, distance: 0.6, duration: 32 },
        { timestamp: '2020-03-21T05:48:01.510Z', healthStatus: SICK, distance: 1.4, duration: 5 },
        { timestamp: '2020-03-20T18:48:01.510Z', healthStatus: SICK, distance: 4.3, duration: 10 },
        { timestamp: '2020-03-20T10:48:01.510Z', healthStatus: HEALTHY, distance: 11.4, duration: 13 },
        { timestamp: '2020-03-20T07:48:01.510Z', healthStatus: SICK, distance: 2.3, duration: 64 },
        { timestamp: '2020-03-19T23:48:01.510Z', healthStatus: HEALTHY, distance: 8.2, duration: 43 },
        { timestamp: '2020-03-19T16:48:01.510Z', healthStatus: HEALTHY, distance: 3.7, duration: 12 },
        { timestamp: '2020-03-18T08:48:01.510Z', healthStatus: SICK, distance: 9.1, duration: 76 },
      ],
    })
  })

  it('should return only sick contacts', async () => {
    const { body } = await request(getTestHost())
      .get(`/api/device/deviceIdA/contact?healthStatus=${SICK}`)
      .expect(HttpStatus.OK)

    expect(body).to.deep.equal({
      contacts: [
        { timestamp: '2020-03-21T10:48:01.510Z', healthStatus: SICK, distance: 0.3, duration: 54 },
        { timestamp: '2020-03-21T05:48:01.510Z', healthStatus: SICK, distance: 1.4, duration: 5 },
        { timestamp: '2020-03-20T18:48:01.510Z', healthStatus: SICK, distance: 4.3, duration: 10 },
        { timestamp: '2020-03-20T07:48:01.510Z', healthStatus: SICK, distance: 2.3, duration: 64 },
        { timestamp: '2020-03-18T08:48:01.510Z', healthStatus: SICK, distance: 9.1, duration: 76 },
      ],
    })
  })
})
