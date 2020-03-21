import { EVENT_TYPE } from '../../api/event-type.js'
import { timeNow } from '../../utility/time-now.js'

export default ({ database }) => async (req, res) => {
  const registrationData = req.body
  const { deviceId } = req.params
  const { timestamp = timeNow(), beaconId, ...payload } = registrationData

  await database.saveEvent({
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
