import { EVENT_TYPE } from '../../api/event-type.js'
import { timeNow } from '../../utility/time-now.js'

export default ({ database }) => async (req, res) => {
  const healthStateData = req.body
  const { deviceId } = req.params
  const { timestamp = timeNow(), healthState, ...payload } = healthStateData

  await database.saveEvent({
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
