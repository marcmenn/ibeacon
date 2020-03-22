import { collection } from '../../database/couchbase.js'
import { timeNow } from '../../utility/time-now.js'
import wrapAsync from './wrap-async.js'

export default (type) => wrapAsync(async (req, res) => {
  const { deviceId } = req.params
  const payload = req.body
  const { id } = req

  const timestamp = timeNow()
  const event = { type, deviceId, payload }
  await collection().insert(id, event)

  res.send({
    type,
    deviceId,
    timestamp,
    payload,
  })
})
