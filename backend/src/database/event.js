import uuid from 'uuid'

import { collection } from './couchbase.js'

const { v4 } = uuid

export default async (type, deviceId, timestamp, payload) => {
  const id = v4()
  const event = { type, deviceId, timestamp, payload }
  await collection().insert(id, event)
  return { id, event }
}
