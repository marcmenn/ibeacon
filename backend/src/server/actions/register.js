import { EVENT_TYPE } from '../../api/event-type.js'
import saveEvent from '../../database/index.js'
import { timeNow } from '../../utility/time-now.js'

export default () => async (req, res) => {
  const registrationData = req.body
  const { deviceId } = req.params
  const { timestamp = timeNow(), beaconId, ...payload } = registrationData

  await saveEvent({
    type: EVENT_TYPE.REGISTER,
    deviceId,
    timestamp,
    payload: {
      beaconId,
      ...payload,
    },
  })

  res.send({
    message: 'registered',
    deviceId,
    timestamp,
    beaconId,
  })
}
