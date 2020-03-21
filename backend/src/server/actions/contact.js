import { EVENT_TYPE } from '../../api/event-type.js'
import saveEvent from '../../database/event.js'

export default () => async (req, res) => {
  const contactData = req.body
  const { deviceId } = req.params

  const { timestamp, payload } = await saveEvent(EVENT_TYPE.CONTACT, deviceId, contactData)

  res.send({
    message: 'received',
    deviceId,
    timestamp,
    payload,
  })
}
