import { collection } from '../../database/couchbase.js'
import { timeNow } from '../../utility/time-now.js'
import wrapAsync from './wrap-async.js'

export const prepareEvent = (req, type, timestamp = timeNow()) => {
  const { deviceId } = req.params
  const { beaconId } = req.context
  const payload = req.body
  return { type, deviceId, beaconId, timestamp, payload }
}

export default (type) => wrapAsync(async (req, res) => {
  const event = prepareEvent(req, type)

  const { id } = req
  await collection().insert(id, event)

  res.send(event)
})
