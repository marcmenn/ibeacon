import { collection } from '../../database/couchbase.js'
import { createId } from '../../utility/create-id.js'
import { timeNow } from '../../utility/time-now.js'

export default (type) => async (req, res) => {
  const { deviceId } = req.params
  const payload = req.body

  const id = createId()
  const timestamp = timeNow()
  const event = { type, deviceId, payload }
  await collection().insert(id, event)

  res.send({
    type,
    deviceId,
    timestamp,
    payload,
  })
}
