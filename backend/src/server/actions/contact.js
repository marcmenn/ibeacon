import { EVENT_TYPE } from '../../api/event-type.js'
import saveEvent from '../../database/event.js'
import { timeNow } from '../../utility/time-now.js'

export default () => async (req, res) => {
  const contactData = req.body
  const { deviceId } = req.params
  const { timestamp = timeNow(), beaconId, contactedBeaconId, ...payload } = contactData

  await saveEvent(EVENT_TYPE.CONTACT, deviceId, timestamp, {
    beaconId,
    contactedBeaconId,
    ...payload,
  })

  res.send({
    message: 'received',
    deviceId,
    timestamp,
    beaconId,
    contactedBeaconId,
  })
}
