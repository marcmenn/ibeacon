import { EVENT_TYPE } from '../../api/event-type.js'
import saveEvent from '../../database/event.js'
import { timeNow } from '../../utility/time-now.js'

export default () => async (req, res) => {
  const healthStateData = req.body
  const { deviceId } = req.params
  const { timestamp = timeNow(), healthState } = healthStateData

  await saveEvent(EVENT_TYPE.HEALTH_STATE, deviceId, healthStateData)

  res.send({
    message: 'received',
    deviceId,
    timestamp,
    healthState,
  })
}
