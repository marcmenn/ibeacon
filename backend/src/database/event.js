import uuid from 'uuid'

import { timeNow } from '../utility/time-now.js'

import { collection } from './couchbase.js'

const { v4 } = uuid

export default async (type, deviceId, payload) => {
  const id = v4()
  const event = { type, deviceId, timestamp: timeNow(), payload }
  await collection().insert(id, event)
  return { id, ...event }
}
