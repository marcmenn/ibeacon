import { EVENT_TYPE } from '../../api/event-type.js'
import { timeNow } from '../../utility/time-now.js'

export default ({ database }) => async (req, res) => {
  const contactData = req.body
  const { deviceId } = req.params
  const { timestamp = timeNow(), beaconId, contactedBeaconId, ...payload } = contactData

  await database.saveEvent({
    type: EVENT_TYPE.CONTACT,
    deviceId,
    timestamp,
    payload: {
      beaconId,
      contactedBeaconId,
      ...payload,
    },
  })

  res.send({
    message: 'received',
    deviceId,
    timestamp,
    beaconId,
    contactedBeaconId,
  })
}
