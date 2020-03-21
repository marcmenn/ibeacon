import request from 'supertest'
import HttpStatus from 'http-status-codes'

import { getVersion } from '../../../src/get-version'

import { getTestHost } from '../../setup/test-server'

describe('GET /api', () => {
  test('should return name and version', async () => {
    const { body } = await request(getTestHost())
      .get('/api')
      .expect(HttpStatus.OK)

    expect(body).toEqual({
      name: 'ibeacon API',
      version: getVersion(),
    })
  })
})
