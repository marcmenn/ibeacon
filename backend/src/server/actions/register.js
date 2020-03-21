import { EVENT_TYPE } from '../../api/event-type.js'
import saveEvent from '../../database/event.js'
import { timeNow } from '../../utility/time-now.js'

export default () => async (req, res) => {
  const registrationData = req.body
  const { deviceId } = req.params
  const { timestamp = timeNow(), beaconId, ...payload } = registrationData

  await saveEvent(EVENT_TYPE.REGISTER, deviceId, timestamp, {
    beaconId,
    ...payload,
  })

  res.send({
    message: 'registered',
    deviceId,
    timestamp,
    beaconId,
  })
}
