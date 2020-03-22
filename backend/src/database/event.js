import { timeNow } from '../utility/time-now.js'
import { createId } from '../utility/create-id.js'

import { collection } from './couchbase.js'

const saveEvent = async (type, deviceId, payload) => {
  const id = createId()
  const event = { type, deviceId, timestamp: timeNow(), payload }
  await collection().insert(id, event)
  return { id, ...event }
}

export default saveEvent
