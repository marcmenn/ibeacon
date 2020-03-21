import { EVENT_TYPE } from '../../api/event-type.js'
import saveEvent from '../../database/event.js'

export default async (req, res) => {
  const healthStateData = req.body
  const { deviceId } = req.params
  const { healthState } = healthStateData

  const { timestamp, payload } = await saveEvent(EVENT_TYPE.HEALTH_STATE, deviceId, healthStateData)

  res.send({
    message: 'received',
    deviceId,
    timestamp,
    payload,
  })
}
