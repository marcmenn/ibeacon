import { EVENT_TYPE } from '../../api/event-type.js'
import saveEvent from '../../database/index.js'
import { timeNow } from '../../utility/time-now.js'

export default () => async (req, res) => {
  const healthStateData = req.body
  const { deviceId } = req.params
  const { timestamp = timeNow(), healthState, ...payload } = healthStateData

  await saveEvent({
    type: EVENT_TYPE.HEALTH_STATE,
    deviceId,
    timestamp,
    payload: {
      healthState,
      ...payload,
    },
  })

  res.send({
    message: 'received',
    deviceId,
    timestamp,
    healthState,
  })
}
